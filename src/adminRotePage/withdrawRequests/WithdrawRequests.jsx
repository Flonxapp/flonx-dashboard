import { useEffect, useState } from "react";
import { Input, Modal, Pagination, Select, Table, Tooltip, message } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { FaChevronDown } from "react-icons/fa";
import { Navigate } from "../../Navigate";
import {
  apiErrorMessage,
  formatDate,
  formatMoney,
  ModalTitle,
  WITHDRAW_STATUS,
  WithdrawStatusBadge,
} from "../../components/withdraw/withdrawUtils";
import {
  useApproveWithdrawRequestMutation,
  useGetAllWithdrawRequestsQuery,
  useRejectWithdrawRequestMutation,
} from "../../page/redux/api/withdrawApi";

const { Option } = Select;

const SummaryCard = ({ label, count, amount, accent }) => (
  <div className="border border-[#2A2448] rounded-xl p-4 flex-1 min-w-[180px]">
    <p className="text-gray-400 text-sm italic">{label}</p>
    <p className={`text-xl font-semibold mt-1 ${accent}`}>{formatMoney(amount)}</p>
    <p className="text-xs text-gray-500 mt-1">{count} request(s)</p>
  </div>
);

const WithdrawRequests = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(WITHDRAW_STATUS.PENDING);
  const [searchInput, setSearchInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const pageSize = 10;

  // debounce search
  useEffect(() => {
    const t = setTimeout(() => {
      setSearchTerm(searchInput.trim());
      setPage(1);
    }, 400);
    return () => clearTimeout(t);
  }, [searchInput]);

  const { data, isFetching, isError } = useGetAllWithdrawRequestsQuery({
    page,
    limit: pageSize,
    status,
    searchTerm,
  });
  const rows = data?.data?.result || [];
  const meta = data?.data?.meta;
  const summary = meta?.summary;

  const [approve, { isLoading: isApproving }] =
    useApproveWithdrawRequestMutation();
  const [reject, { isLoading: isRejecting }] =
    useRejectWithdrawRequestMutation();

  const [approveTarget, setApproveTarget] = useState(null);
  const [rejectTarget, setRejectTarget] = useState(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejectError, setRejectError] = useState("");

  const handleApprove = async () => {
    try {
      const res = await approve(approveTarget._id).unwrap();
      message.success(res?.message || "Withdrawal approved");
      setApproveTarget(null);
    } catch (err) {
      message.error(apiErrorMessage(err, "Approval failed"), 8);
      setApproveTarget(null);
    }
  };

  const handleReject = async () => {
    if (rejectReason.trim().length < 3) {
      setRejectError("Please write a reason (at least 3 characters)");
      return;
    }
    try {
      const res = await reject({
        id: rejectTarget._id,
        reason: rejectReason.trim(),
      }).unwrap();
      message.success(res?.message || "Withdrawal rejected");
      setRejectTarget(null);
    } catch (err) {
      setRejectError(apiErrorMessage(err, "Reject failed"));
    }
  };

  const columns = [
    {
      title: "Venue Owner",
      key: "venueOwner",
      render: (_, r) => (
        <div>
          <p className="text-white">{r.venueOwner?.name || "—"}</p>
          <p className="text-xs text-gray-400">{r.venueOwner?.email}</p>
        </div>
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (a) => <span className="font-semibold">{formatMoney(a)}</span>,
    },
    {
      title: "Requested On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d) => formatDate(d),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s, r) => (
        <div className="flex flex-col gap-1 items-start">
          <WithdrawStatusBadge status={s} />
          {r.lastError && s !== WITHDRAW_STATUS.APPROVED && (
            <Tooltip title={r.lastError}>
              <span className="text-xs text-red-400 cursor-help">
                Last attempt failed
              </span>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "Stripe",
      key: "stripe",
      render: (_, r) =>
        r.venueOwner?.isStripeAccountConnected ? (
          <span className="text-green-400 text-xs">Connected</span>
        ) : (
          <span className="text-red-400 text-xs">Not connected</span>
        ),
    },
    {
      title: "Details",
      key: "details",
      render: (_, r) => (
        <div className="text-xs text-gray-400 max-w-[260px]">
          {r.note && <p>Owner note: {r.note}</p>}
          {r.rejectReason && <p className="text-red-300">Reason: {r.rejectReason}</p>}
          {r.stripeTransferId && <p>Transfer: {r.stripeTransferId}</p>}
          {r.processedAt && <p>Processed: {formatDate(r.processedAt)}</p>}
          {!r.note && !r.rejectReason && !r.stripeTransferId && !r.processedAt && "—"}
        </div>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, r) => {
        // a stuck PROCESSING request can be retried
        const canApprove =
          r.status === WITHDRAW_STATUS.PENDING ||
          r.status === WITHDRAW_STATUS.PROCESSING;
        const canReject = r.status === WITHDRAW_STATUS.PENDING;
        if (!canApprove && !canReject) return <span className="text-gray-500">—</span>;
        return (
          <div className="flex gap-2">
            {canApprove && (
              <button
                onClick={() => setApproveTarget(r)}
                className="bg-green-600/80 hover:bg-green-600 text-white text-xs px-3 py-1.5 rounded-lg"
              >
                {r.status === WITHDRAW_STATUS.PROCESSING ? "Retry" : "Approve"}
              </button>
            )}
            {canReject && (
              <button
                onClick={() => {
                  setRejectTarget(r);
                  setRejectReason("");
                  setRejectError("");
                }}
                className="bg-red-600/80 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-lg"
              >
                Reject
              </button>
            )}
          </div>
        );
      },
    },
  ];

  return (
    <div className="p-3 h-[87vh] overflow-auto">
      <div className="flex justify-between">
        <Navigate title={"Withdraw Requests"} />
      </div>

      {summary && (
        <div className="flex flex-wrap gap-3 mb-5">
          <SummaryCard
            label="Pending review"
            count={(summary.PENDING?.count || 0) + (summary.PROCESSING?.count || 0)}
            amount={(summary.PENDING?.amount || 0) + (summary.PROCESSING?.amount || 0)}
            accent="text-yellow-400"
          />
          <SummaryCard
            label="Approved (all time)"
            count={summary.APPROVED?.count}
            amount={summary.APPROVED?.amount}
            accent="text-green-400"
          />
          <SummaryCard
            label="Rejected (all time)"
            count={summary.REJECTED?.count}
            amount={summary.REJECTED?.amount}
            accent="text-red-400"
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-between items-center mb-3">
        <Input
          placeholder="Search venue owner by name, email or phone"
          prefix={<SearchOutlined />}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          allowClear
          style={{ maxWidth: 360 }}
        />
        <Select
          className="custom-select"
          popupClassName="custom-select-dropdown"
          allowClear
          placeholder="All statuses"
          value={status}
          onChange={(v) => {
            setStatus(v);
            setPage(1);
          }}
          style={{ minWidth: 170 }}
          suffixIcon={<FaChevronDown className="text-[#C9C6D6] text-sm" />}
        >
          <Option value={WITHDRAW_STATUS.PENDING}>Pending review</Option>
          <Option value={WITHDRAW_STATUS.PROCESSING}>Processing</Option>
          <Option value={WITHDRAW_STATUS.APPROVED}>Approved</Option>
          <Option value={WITHDRAW_STATUS.REJECTED}>Rejected</Option>
          <Option value={WITHDRAW_STATUS.REVERSED}>Reversed</Option>
        </Select>
      </div>

      {isError && (
        <p className="text-red-400 text-sm mb-2">Could not load withdraw requests.</p>
      )}

      <Table
        dataSource={rows}
        columns={columns}
        loading={isFetching}
        rowKey="_id"
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table"
        locale={{ emptyText: "No withdraw requests" }}
      />

      <div className="bg-[#822CE71A] w-full py-3 flex justify-center">
        <Pagination
          current={page}
          pageSize={pageSize}
          total={meta?.total || 0}
          onChange={setPage}
          showSizeChanger={false}
        />
      </div>

      <Modal
        open={!!approveTarget}
        centered
        footer={null}
        onCancel={() => !isApproving && setApproveTarget(null)}
        className="custom-delete-modal"
      >
        {approveTarget && (
          <>
            <ModalTitle
              title="Approve withdrawal?"
              subtitle={`${formatMoney(approveTarget.amount)} will be transferred from the platform Stripe balance to ${approveTarget.venueOwner?.name || "the venue owner"}'s connected Stripe account. Stripe then pays it to their bank on their payout schedule. This cannot be undone from here.`}
            />
            {approveTarget.lastError && (
              <p className="text-xs text-red-400 mb-3">
                Previous attempt: {approveTarget.lastError}
              </p>
            )}
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setApproveTarget(null)}
                disabled={isApproving}
                className="bg-[#555] text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                disabled={isApproving}
                className="bg-green-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
              >
                {isApproving ? "Transferring…" : "Approve & Transfer"}
              </button>
            </div>
          </>
        )}
      </Modal>

      <Modal
        open={!!rejectTarget}
        centered
        footer={null}
        onCancel={() => !isRejecting && setRejectTarget(null)}
        className="custom-delete-modal"
      >
        {rejectTarget && (
          <>
            <ModalTitle
              title="Reject withdrawal"
              subtitle={`${formatMoney(rejectTarget.amount)} will be returned to ${rejectTarget.venueOwner?.name || "the venue owner"}'s balance. They will see your reason.`}
            />
            <label className="block text-sm text-gray-300 mb-1">Reason *</label>
            <textarea
              rows={4}
              maxLength={1000}
              value={rejectReason}
              onChange={(e) => {
                setRejectReason(e.target.value);
                setRejectError("");
              }}
              className="w-full border border-[#2A2448] rounded-lg bg-[#0F0B1A] text-white px-3 py-2 outline-none resize-none"
              placeholder="e.g. Bank details on Stripe need to be verified first"
            />
            {rejectError && <p className="text-red-400 text-sm mt-1">{rejectError}</p>}
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setRejectTarget(null)}
                disabled={isRejecting}
                className="bg-[#555] text-white px-5 py-2 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleReject}
                disabled={isRejecting}
                className="bg-red-600 text-white px-5 py-2 rounded-lg disabled:opacity-50"
              >
                {isRejecting ? "Rejecting…" : "Reject Request"}
              </button>
            </div>
          </>
        )}
      </Modal>
    </div>
  );
};

export default WithdrawRequests;
