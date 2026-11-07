import { RotateCw } from "lucide-react";
import { Button } from "../atoms/Button";

type ErrorStateProps = {
  title: string;
  description: string;
  onRetry: () => void;
  retryLabel: string;
};

/** Failed load with a way to try again. Never leaves the user at a dead end. */
export function ErrorState({ title, description, onRetry, retryLabel }: ErrorStateProps) {
  return (
    <div role="alert" className="flex flex-col items-center px-6 py-10 text-center">
      <h3 className="text-lg font-semibold text-ink">{title}</h3>
      <p className="mt-2 max-w-sm text-pretty text-ink-soft">{description}</p>
      <Button variant="soft" className="mt-6" onClick={onRetry}>
        <RotateCw className="size-4" aria-hidden="true" />
        {retryLabel}
      </Button>
    </div>
  );
}
