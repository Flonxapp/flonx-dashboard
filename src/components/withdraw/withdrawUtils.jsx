export const WITHDRAW_STATUS = {
  PENDING: "PENDING",
  PROCESSING: "PROCESSING",
  APPROVED: "APPROVED",
  REJECTED: "REJECTED",
  REVERSED: "REVERSED",
};

const STATUS_STYLE = {
  PENDING: { label: "Pending review", cls: "bg-yellow-500/20 text-yellow-400" },
  PROCESSING: { label: "Processing", cls: "bg-blue-500/20 text-blue-400" },
  APPROVED: { label: "Approved", cls: "bg-green-500/20 text-green-400" },
  REJECTED: { label: "Rejected", cls: "bg-red-500/20 text-red-400" },
  REVERSED: { label: "Reversed", cls: "bg-orange-500/20 text-orange-400" },
};

export const WithdrawStatusBadge = ({ status }) => {
  const style = STATUS_STYLE[status] || {
    label: status,
    cls: "bg-gray-500/20 text-gray-300",
  };
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs whitespace-nowrap ${style.cls}`}
    >
      {style.label}
    </span>
  );
};

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const formatMoney = (value) => moneyFormatter.format(Number(value) || 0);

export const formatDate = (date, withTime = true) =>
  date
    ? new Date(date).toLocaleString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
      })
    : "—";

export const apiErrorMessage = (err, fallback = "Something went wrong") =>
  err?.data?.message || err?.error || fallback;

export const ModalTitle = ({ title, subtitle }) => (
  <div className="mb-4">
    <h2 className="text-xl font-semibold text-white">{title}</h2>
    {subtitle && <p className="text-sm text-gray-400 mt-1">{subtitle}</p>}
  </div>
);
