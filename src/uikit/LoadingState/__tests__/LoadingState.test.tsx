import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import LoadingState from '../index';

describe('LoadingState', () => {
  it('renders spinner when type is spinner', () => {
    render(<LoadingState type="spinner" />);
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('renders skeleton when type is skeleton', () => {
    render(<LoadingState type="skeleton" rows={3} />);
    expect(screen.getByTestId('skeleton-loading')).toBeInTheDocument();
  });

  it('renders correct number of skeleton rows', () => {
    const rows = 5;
    render(<LoadingState type="skeleton" rows={rows} />);
    const skeletonElements = screen.getAllByTestId('skeleton-row');
    expect(skeletonElements).toHaveLength(rows);
  });
}); 