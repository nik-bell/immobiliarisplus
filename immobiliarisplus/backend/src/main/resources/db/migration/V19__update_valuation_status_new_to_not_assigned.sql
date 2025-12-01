-- Update existing property_valuation records from NEW to NOT_ASSIGNED
UPDATE property_valuation
SET status = 'NOT_ASSIGNED'
WHERE status = 'NEW';

