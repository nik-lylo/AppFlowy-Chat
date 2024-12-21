import { ComponentProps, FC, ReactNode } from 'react';
import clsx from 'clsx';
import TooltipDefault from '../tooltip-default';

interface Props extends ComponentProps<'button'> {
  icon: ReactNode;
  tooltip: string;
  active?: boolean;
  iconMainWrapClass?: string;
  activeClass?: string;
  colorClass?: string;
  children?: ReactNode;
}

const ButtonBarAI: FC<Props> = ({
  icon,
  className = '',
  iconMainWrapClass,
  active = false,
  activeClass = 'bg-ch-fill-hover',
  colorClass = 'text-ch-primary-gray2',

  tooltip,
  children,
  ...rest
}) => {
  return (
    <TooltipDefault title={tooltip}>
      <button
        className={clsx([
          className,
          colorClass,
          'hover:bg-ch-fill-hover disabled:text-ch-text-disabled flex h-6 items-center gap-[1px] rounded-lg p-1 transition-colors disabled:bg-transparent',
          { [activeClass]: active },
        ])}
        type='button'
        {...rest}
      >
        <div
          className={clsx(
            iconMainWrapClass
              ? iconMainWrapClass
              : 'h-full w-full [&>svg]:h-4 [&>svg]:w-4'
          )}
        >
          {icon}
        </div>
        {children && children}
      </button>
    </TooltipDefault>
  );
};

export default ButtonBarAI;
