import { shortenAddress } from "@/lib/format/address";
import { classNames } from "@/lib/ui/class-names";

type AddressChipProps = {
  address: string;
  className?: string;
};

/** Wallet address in short form. The full value stays available on hover and to screen readers. */
export function AddressChip({ address, className }: AddressChipProps) {
  return (
    <span
      title={address}
      className={classNames(
        "inline-flex items-center rounded-full bg-hairline px-2.5 py-1 font-mono text-xs text-ink-soft",
        className,
      )}
    >
      <span aria-hidden="true">{shortenAddress(address)}</span>
      <span className="sr-only">{address}</span>
    </span>
  );
}
