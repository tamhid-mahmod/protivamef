import type { ICentreTableFilters } from 'src/types/centre';
import type { UseSetStateReturn } from 'minimal-shared/hooks';
import type { FiltersResultProps } from 'src/components/filters-result';

import { useCallback } from 'react';

import Chip from '@mui/material/Chip';

import { chipProps, FiltersBlock, FiltersResult } from 'src/components/filters-result';

// ----------------------------------------------------------------------

type Props = FiltersResultProps & {
  onResetPage: () => void;
  filters: UseSetStateReturn<ICentreTableFilters>;
};

export function CentreTableFiltersResult({ filters, totalResults, onResetPage, sx }: Props) {
  const { state: currentFilters, setState: updateFilters, resetState: resetFilters } = filters;

  const handleRemoveKeyword = useCallback(() => {
    onResetPage();
    updateFilters({ name: '' });
  }, [onResetPage, updateFilters]);

  const handleRemovePublish = useCallback(() => {
    onResetPage();
    updateFilters({ publish: 'all' });
  }, [onResetPage, updateFilters]);

  const handleRemoveDivision = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.divisions.filter((item) => item !== inputValue);

      onResetPage();
      updateFilters({ divisions: newValue });
    },
    [onResetPage, updateFilters, currentFilters.divisions]
  );

  const handleRemoveDistrict = useCallback(
    (inputValue: string) => {
      const newValue = currentFilters.districts.filter((item) => item !== inputValue);

      onResetPage();
      updateFilters({ districts: newValue });
    },
    [onResetPage, updateFilters, currentFilters.districts]
  );

  const handleReset = useCallback(() => {
    onResetPage();
    resetFilters();
  }, [onResetPage, resetFilters]);

  return (
    <FiltersResult totalResults={totalResults} onReset={handleReset} sx={sx}>
      <FiltersBlock label="Status:" isShow={currentFilters.publish !== 'all'}>
        <Chip
          {...chipProps}
          label={currentFilters.publish}
          onDelete={handleRemovePublish}
          sx={{ textTransform: 'capitalize' }}
        />
      </FiltersBlock>

      <FiltersBlock label="Division:" isShow={!!currentFilters.divisions.length}>
        {currentFilters.divisions.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={item}
            onDelete={() => handleRemoveDivision(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="District:" isShow={!!currentFilters.districts.length}>
        {currentFilters.districts.map((item) => (
          <Chip
            {...chipProps}
            key={item}
            label={item}
            onDelete={() => handleRemoveDistrict(item)}
          />
        ))}
      </FiltersBlock>

      <FiltersBlock label="Keyword:" isShow={!!currentFilters.name}>
        <Chip {...chipProps} label={currentFilters.name} onDelete={handleRemoveKeyword} />
      </FiltersBlock>
    </FiltersResult>
  );
}
