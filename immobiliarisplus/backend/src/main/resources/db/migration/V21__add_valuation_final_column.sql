-- Add valuation_final column to property_valuation table
ALTER TABLE property_valuation
ADD COLUMN valuation_final DOUBLE NULL AFTER estimated_price_max;

