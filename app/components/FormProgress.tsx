import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

interface FormProgressProps {
  steps: ReadonlyArray<{
    readonly id: string;
    readonly title: string;
    readonly description: string;
    readonly fields: ReadonlyArray<string>;
  }>;
  currentStep: number;
  progress: number;
}

export function FormProgress({ steps, currentStep, progress }: FormProgressProps) {
  return (
    <div className="space-y-4">
      <Progress value={progress} className="h-2" />

      <div
        className={cn(
          'grid gap-2 sm:gap-4',
          steps.length === 2 && 'grid-cols-2',
          steps.length === 3 && 'grid-cols-3',
          steps.length === 4 && 'grid-cols-4'
        )}
      >
        {steps.map((step, index) => (
          <div
            key={step.id}
            className={`text-center ${
              index === currentStep
                ? 'text-primary'
                : index < currentStep
                  ? 'text-primary/70'
                  : 'text-muted-foreground'
            }`}
          >
            <p className="text-xs sm:text-sm font-medium truncate">{step.title}</p>
            {index === currentStep && (
              <p className="text-xs text-muted-foreground mt-1 hidden sm:block">
                {step.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
