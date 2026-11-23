import { useState } from "react";
import { Pagination, Select, Table } from "antd";
import { FaChevronDown } from "react-icons/fa";
import {
  formatDate,
  formatMoney,
  WITHDRAW_STATUS,
  WithdrawStatusBadge,
} from "../../components/withdraw/withdrawUtils";
import { useGetMyWithdrawRequestsQuery } from "../redux/api/withdrawApi";

const { Option } = Select;

const WithdrawHistory = () => {
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState(undefined);
  const pageSize = 10;

  const { data, isFetching, isError } = useGetMyWithdrawRequestsQuery({
    page,
    limit: pageSize,
    status,
  });
  const rows = data?.data?.result || [];
  const meta = data?.data?.meta;

  const columns = [
    {
      title: "Requested On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (d) => formatDate(d),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (a) => formatMoney(a),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (s) => <WithdrawStatusBadge status={s} />,
    },
    {
      title: "Processed On",
      dataIndex: "processedAt",
      key: "processedAt",
      render: (d) => formatDate(d),
    },
    {
      title: "Admin Note",
      key: "adminNote",
      render: (_, r) => {
        if (r.status === WITHDRAW_STATUS.REJECTED) {
          return (
            <span className="text-red-300 text-sm">
              {r.rejectReason} — amount returned to your balance
            </span>
          );
        }
        if (r.status === WITHDRAW_STATUS.APPROVED) {
          return (
            <span className="text-gray-400 text-sm">
              Sent to your Stripe account. Paid to your bank on your Stripe
              payout schedule.
            </span>
          );
        }
        if (r.status === WITHDRAW_STATUS.REVERSED) {
          return (
            <span className="text-orange-300 text-sm">
              Transfer reversed — amount returned to your balance
            </span>
          );
        }
        return <span className="text-gray-500 text-sm">Waiting for review</span>;
      },
    },
    {
      title: "Your Note",
      dataIndex: "note",
      key: "note",
      render: (n) => <span className="text-gray-400 text-sm">{n || "—"}</span>,
    },
  ];

  return (
    <div>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-white">Withdraw Requests</h2>
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
          style={{ minWidth: 160 }}
          suffixIcon={<FaChevronDown className="text-[#C9C6D6] text-sm" />}
        >
          <Option value={WITHDRAW_STATUS.PENDING}>Pending review</Option>
          <Option value={WITHDRAW_STATUS.APPROVED}>Approved</Option>
          <Option value={WITHDRAW_STATUS.REJECTED}>Rejected</Option>
          <Option value={WITHDRAW_STATUS.REVERSED}>Reversed</Option>
        </Select>
      </div>

      {isError && (
        <p className="text-red-400 text-sm mb-2">
          Could not load withdraw requests.
        </p>
      )}

      <Table
        dataSource={rows}
        columns={columns}
        loading={isFetching}
        rowKey="_id"
        pagination={false}
        scroll={{ x: "max-content" }}
        className="custom-table"
        locale={{ emptyText: "No withdraw requests yet" }}
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
    </div>
  );
};

export default WithdrawHistory;
