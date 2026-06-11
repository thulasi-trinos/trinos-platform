import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

import { Button } from './Button';

interface PaginationProps {
  page: number;
  pageCount: number;
  onChange: (page: number) => void;
}

export function Pagination({ page, pageCount, onChange }: PaginationProps): ReactNode {
  if (pageCount <= 1) return null;
  return (
    <div className="flex items-center justify-between gap-3 pt-4">
      <span className="text-[13px] text-ink4">
        Page {page} of {pageCount}
      </span>
      <div className="flex gap-2">
        <Button
          variant="ghost"
          size="tiny"
          disabled={page <= 1}
          onClick={() => onChange(page - 1)}
          leftIcon={<ChevronLeft size={15} />}
        >
          Prev
        </Button>
        <Button
          variant="ghost"
          size="tiny"
          disabled={page >= pageCount}
          onClick={() => onChange(page + 1)}
          rightIcon={<ChevronRight size={15} />}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
