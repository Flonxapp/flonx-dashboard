import { useState } from "react";
import { Modal, message } from "antd";
import { Link } from "react-router-dom";
import EarningIco from "../../components/icon/EarningIco";
import {
  apiErrorMessage,
  formatMoney,
  ModalTitle,
} from "../../components/withdraw/withdrawUtils";
import {
  useCreateWithdrawRequestMutation,
  useGetWalletQuery,
} from "../redux/api/withdrawApi";

const StatCard = ({ label, value, hint, highlight }) => (
  <div className="border border-[#2A2448] rounded-xl p-4 flex-1 min-w-[180px]">
    <p className="text-gray-400 text-sm italic">{label}</p>
    <p
      className={`text-xl font-semibold mt-1 ${
        highlight ? "text-purple-400" : "text-white"
      }`}
    >
      {value}
    </p>
    {hint && <p className="text-xs text-gray-500 mt-1">{hint}</p>}
  </div>
);

const WalletSection = () => {
  const { data, isLoading, isError } = useGetWalletQuery();
  const [createRequest, { isLoading: isSubmitting }] =
    useCreateWithdrawRequestMutation();

  const [open, setOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [error, setError] = useState("");

  const wallet = data?.data;
  const balance = wallet?.currentBalance ?? 0;
  const minAmount = wallet?.minWithdrawAmount ?? 0;

  let blockedReason = "";
  if (wallet && !wallet.isStripeAccountConnected) {
    blockedReason = "Connect your Stripe account to withdraw.";
  } else if (wallet?.hasOpenRequest) {
    blockedReason = "You have a withdraw request under review.";
  } else if (wallet && balance < minAmount) {
    blockedReason = `Minimum withdrawal is ${formatMoney(minAmount)}.`;
  }

  const openModal = () => {
    setAmount(balance > 0 ? balance.toFixed(2) : "");
    setNote("");
    setError("");
    setOpen(true);
  };

  const validate = () => {
    const value = Number(amount);
    if (!amount || Number.isNaN(value) || value <= 0) {
      return "Enter a valid amount";
    }
    if (!/^\d+(\.\d{1,2})?$/.test(String(amount).trim())) {
      return "Amount can have at most 2 decimal places";
    }
    if (value < minAmount) return `Minimum withdrawal is ${formatMoney(minAmount)}`;
    if (value > balance) return `You can withdraw up to ${formatMoney(balance)}`;
    return "";
  };

  const handleSubmit = async () => {
    const validationError = validate();
    if (validationError) {
      setError(validationError);
      return;
    }
    try {
      const res = await createRequest({
        amount: Number(amount),
        ...(note.trim() ? { note: note.trim() } : {}),
      }).unwrap();
      message.success(res?.message || "Withdraw request submitted");
      setOpen(false);
    } catch (err) {
      setError(apiErrorMessage(err, "Could not submit the withdraw request"));
    }
  };

  return (
    <div className="border border-[#2A2448] rounded-xl mb-5">
      <div className="flex flex-wrap gap-3 border-b px-4 py-3 border-[#2A2448] justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="bg-[#1a1238] p-3 rounded-xl">
            <EarningIco color={"#822CE7"} />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Wallet</h2>
            <p className="text-xs text-gray-400">
              Your share of each paid order
              {wallet ? ` (after the ${wallet.platformFeePercentage}% platform fee)` : ""}{" "}
              and customer tips (to pass on to your bartenders) are added here. Approved withdrawals are sent to your Stripe
              account and paid out to your bank on Stripe&apos;s schedule.
            </p>
          </div>
        </div>

        <div className="text-right">
          <button
            onClick={openModal}
            disabled={isLoading || isError || !!blockedReason}
            className="bg-gradient-to-tr from-[#822CE7] to-[#BB82FF] text-white px-5 py-2 rounded-lg font-medium disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Request Withdraw
          </button>
          {blockedReason && (
            <p className="text-xs text-gray-400 mt-1">
              {blockedReason}{" "}
              {!wallet?.isStripeAccountConnected && (
                <Link to="/connectStripe" className="text-purple-400 underline">
                  Connect now
                </Link>
              )}
            </p>
          )}
        </div>
      </div>

      {isError ? (
        <p className="px-4 py-5 text-red-400 text-sm">
          Could not load your wallet. Please refresh the page.
        </p>
      ) : (
        <div className="flex flex-wrap gap-3 p-4">
          <StatCard
            label="Available balance"
            value={isLoading ? "…" : formatMoney(balance)}
            hint={balance < 0 ? "Negative because of refunded orders" : null}
            highlight
          />
          <StatCard
            label="Pending withdrawal"
            value={isLoading ? "…" : formatMoney(wallet?.pendingWithdrawAmount)}
            hint="Waiting for admin review"
          />
          <StatCard
            label="Total withdrawn"
            value={isLoading ? "…" : formatMoney(wallet?.totalWithdrawn)}
          />
          <StatCard
            label="Total earned"
            value={isLoading ? "…" : formatMoney(wallet?.totalEarning)}
            hint="Net of platform fee and refunds"
          />
        </div>
      )}

      <Modal
        open={open}
        centered
        footer={null}
        onCancel={() => !isSubmitting && setOpen(false)}
        className="custom-delete-modal"
        destroyOnClose
      >
        <ModalTitle
          title="Request Withdraw"
          subtitle={`Available balance: ${formatMoney(balance)}`}
        />

        <label className="block text-sm text-gray-300 mb-1">Amount (USD)</label>
        <div className="flex items-center border border-[#2A2448] rounded-lg bg-[#0F0B1A] px-3">
          <span className="text-gray-400">$</span>
          <input
            type="number"
            inputMode="decimal"
            min={minAmount}
            max={balance}
            step="0.01"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError("");
            }}
            className="w-full bg-transparent text-white px-2 py-2 outline-none"
            placeholder="0.00"
          />
          <button
            type="button"
            onClick={() => setAmount(balance.toFixed(2))}
            className="text-xs text-purple-400 whitespace-nowrap"
          >
            Max
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Minimum {formatMoney(minAmount)}. The amount is held from your
          balance until the admin reviews it, and returned if rejected.
        </p>

        <label className="block text-sm text-gray-300 mt-4 mb-1">
          Note for admin (optional)
        </label>
        <textarea
          rows={3}
          maxLength={500}
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full border border-[#2A2448] rounded-lg bg-[#0F0B1A] text-white px-3 py-2 outline-none resize-none"
        />

        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}

        <div className="flex justify-end gap-3 mt-5">
          <button
            onClick={() => setOpen(false)}
            disabled={isSubmitting}
            className="bg-[#555] text-white px-5 py-2 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-tr from-[#822CE7] to-[#BB82FF] text-white px-5 py-2 rounded-lg disabled:opacity-50"
          >
            {isSubmitting ? "Submitting…" : "Submit Request"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default WalletSection;
