# Error Analysis: Variable Input Validation

## Overview
This document analyzes potential errors when entering values for variable items such as interest rates, rent, repair reserves, and sales amounts in various patterns.

## Current Implementation Analysis

### Backend (`backend/routers/api.py`)

#### Strengths:
1. **Type Conversion Functions**: `_to_float()` and `_to_int()` handle:
   - `None` values → default to 0
   - Empty strings → default to 0
   - Boolean values → default to 0 (prevents True/False → 1/0)
   - String numbers → converted properly
   - Exception handling → returns default value

2. **Safe Defaults**: All conversions default to 0, preventing crashes

#### Potential Issues:

1. **No Range Validation**
   - Interest rates can be negative or extremely large (e.g., -100%, 10000%)
   - No validation for realistic ranges (e.g., 0-20% for interest rates)
   - Negative values for rent, repair funds, sales amounts not validated

2. **No Business Logic Validation**
   - No check if `ownPrice > propertyPrice`
   - No check if `borrowPrice` is reasonable
   - No validation that years are in valid ranges

3. **Division by Zero Risks**
   - In `excel_function.py` line 16: `AVERAGE()` can divide by zero if empty list
   - In `vba_function.py` line 105: Division in PMT formula (handled with epsilon check)
   - In `vba_function.py` line 119: Division by rate (handled with epsilon check)

4. **Extreme Value Handling**
   - Very large numbers (e.g., 1e20) may cause overflow
   - Very small numbers may cause precision issues
   - No maximum/minimum bounds

5. **String Input Issues**
   - Frontend sends strings, backend converts them
   - Special characters in numeric fields could cause issues
   - Scientific notation (e.g., "1e5") handled by `float()` but may be unexpected

### Frontend (`frontend/src/pages/InputPage.tsx`)

#### Strengths:
1. **HTML5 Validation**: Some fields have `min`, `max`, `required` attributes
2. **Type Safety**: Uses TypeScript for type checking
3. **Safe Number Conversion**: `safeNum()` function handles empty/null values

#### Potential Issues:

1. **Inconsistent Validation**
   - Some fields have `min`/`max` (e.g., age: 0-100, loanPeriod: 10-45)
   - Many variable fields (interest rate, rent, repair funds) have NO validation
   - No client-side validation for negative values

2. **String to Number Conversion**
   - Line 184: `safeNum()` converts empty strings to 0, but doesn't validate format
   - No check for invalid number formats (e.g., "abc", "12.34.56")
   - Scientific notation accepted but may be confusing

3. **No Real-time Validation**
   - Users can enter invalid values and only see error on submit
   - No feedback for out-of-range values

4. **Missing Error Messages**
   - Generic error: "入力値を正しく入力してください。" (Enter values correctly)
   - No specific field-level error messages
   - No indication of what went wrong

## Specific Variable Items Analysis

### 1. Interest Rate (`interestRate` / `入力!E14`)

**Current Handling:**
- Backend: `_to_float()` → defaults to 0.0
- Frontend: `type="number"` with no min/max

**Potential Issues:**
- ✅ Negative values: Accepted (e.g., -5%) → Could cause calculation errors
- ✅ Very large values: Accepted (e.g., 1000%) → May cause overflow
- ✅ Zero value: Accepted → May cause division issues in some formulas
- ✅ Decimal precision: No limit → Could cause precision errors
- ✅ String input: "abc" → Converted to 0 (silent failure)

**Recommendations:**
- Add validation: `0 <= interestRate <= 20` (reasonable range)
- Show error message for out-of-range values
- Validate on frontend before submission

### 2. Rent (`rentMonthly` / `入力!E20`)

**Current Handling:**
- Backend: `_to_float()` → defaults to 0.0
- Frontend: `type="number"` with no min/max

**Potential Issues:**
- ✅ Negative values: Accepted → Negative rent doesn't make sense
- ✅ Very large values: Accepted (e.g., 1e15) → May cause overflow
- ✅ Zero value: Accepted → Valid but may indicate missing data
- ✅ Decimal values: Accepted → Valid (e.g., 50,000.50)

**Recommendations:**
- Add validation: `rentMonthly >= 0`
- Add reasonable maximum: `rentMonthly <= 10,000,000` (10 million yen/month)
- Show warning for zero values

### 3. Repair Reserves (`repairFundMonthly` / `入力!E26`)

**Current Handling:**
- Backend: `_to_float()` → defaults to 0.0
- Frontend: `type="number"` with no min/max

**Potential Issues:**
- ✅ Negative values: Accepted → Negative repair fund doesn't make sense
- ✅ Very large values: Accepted → May cause calculation issues
- ✅ Zero value: Accepted → Valid (no repair fund)

**Recommendations:**
- Add validation: `repairFundMonthly >= 0`
- Add reasonable maximum: `repairFundMonthly <= 1,000,000` (1 million yen/month)

### 4. Sales Amount (`sellPrice` / `入力!E39`)

**Current Handling:**
- Backend: `_to_float()` → defaults to 0.0
- Frontend: `type="number"` with no min/max

**Potential Issues:**
- ✅ Negative values: Accepted → Negative sale price doesn't make sense
- ✅ Very large values: Accepted → May cause overflow
- ✅ Zero value: Accepted → Valid (no sale)

**Recommendations:**
- Add validation: `sellPrice >= 0`
- Add reasonable maximum: `sellPrice <= 1,000,000,000,000` (1 trillion yen)

### 5. Sales Rate (`sellRate` / `入力!G39`)

**Current Handling:**
- Backend: `_to_float()` → defaults to 0.0
- Frontend: `type="number"` with no min/max

**Potential Issues:**
- ✅ Negative values: Accepted → Could mean price decrease (might be valid)
- ✅ Values > 100: Accepted (e.g., 200%) → Could be valid (price increase)
- ✅ Very large values: Accepted → May cause calculation issues

**Recommendations:**
- Add validation: `0 <= sellRate <= 1000` (0% to 1000% - reasonable range)
- Clarify if this is percentage or multiplier

## Critical Error Scenarios

### Scenario 1: Negative Interest Rate
**Input**: `interestRate = -5`
**Result**: Calculations may produce unexpected results
**Risk**: Medium - Financial calculations may not handle negative rates correctly

### Scenario 2: Extremely Large Interest Rate
**Input**: `interestRate = 10000`
**Result**: May cause overflow in exponential calculations
**Risk**: High - Could crash or produce NaN/Infinity

### Scenario 3: Negative Rent
**Input**: `rentMonthly = -100000`
**Result**: Negative income in calculations
**Risk**: Medium - Business logic may not handle negative income

### Scenario 4: Division by Zero in Calculations
**Input**: `loanPeriod = 0` or `interestRate = 0` with certain combinations
**Result**: Potential division by zero in `pmt()` or other functions
**Risk**: Low - Most functions have epsilon checks, but not all

### Scenario 5: Empty String in Numeric Field
**Input**: `interestRate = ""`
**Result**: Converted to 0 (silent failure)
**Risk**: Low - Defaults to 0, but user may not realize

### Scenario 6: Invalid Number Format
**Input**: `interestRate = "12.34.56"` or `interestRate = "abc"`
**Result**: JavaScript `Number()` may return NaN, backend converts to 0
**Risk**: Medium - Silent failure, no user feedback

### Scenario 7: Scientific Notation
**Input**: `rentMonthly = "1e6"` (1 million)
**Result**: Correctly parsed but may confuse users
**Risk**: Low - Works correctly but UX issue

## Recommendations

### Immediate Fixes (High Priority)

1. **Add Range Validation to Backend**
   ```python
   def _to_float(value, default: float = 0.0, min_val: float = None, max_val: float = None) -> float:
       result = _to_float(value, default)
       if min_val is not None and result < min_val:
           return default
       if max_val is not None and result > max_val:
           return default
       return result
   ```

2. **Add Frontend Validation**
   - Add `min` and `max` attributes to all numeric inputs
   - Add `pattern` validation for number format
   - Show real-time validation feedback

3. **Add Error Handling in API**
   - Return specific error messages for invalid ranges
   - Validate business logic (e.g., ownPrice <= propertyPrice)
   - Return 400 Bad Request with error details

### Medium Priority

4. **Add Input Sanitization**
   - Strip whitespace
   - Remove non-numeric characters (except decimal point and minus)
   - Handle scientific notation explicitly

5. **Add Logging**
   - Log invalid input attempts
   - Log calculation errors
   - Monitor for unusual patterns

### Low Priority

6. **Improve User Experience**
   - Show field-level error messages
   - Highlight invalid fields
   - Provide input examples/format hints

## Testing Checklist

- [ ] Negative interest rates
- [ ] Extremely large interest rates (>100%)
- [ ] Negative rent values
- [ ] Zero values for all fields
- [ ] Empty strings
- [ ] Invalid number formats ("abc", "12.34.56")
- [ ] Scientific notation ("1e6")
- [ ] Very large numbers (1e15)
- [ ] Very small numbers (1e-10)
- [ ] Decimal precision (many decimal places)
- [ ] Special characters in numeric fields
- [ ] Business logic violations (ownPrice > propertyPrice)

## Conclusion

The current implementation has **basic error handling** but lacks **comprehensive validation**. The system will not crash on invalid input (due to default values), but it may produce incorrect results silently. 

**Priority fixes needed:**
1. Range validation for interest rates, rent, repair funds, sales amounts
2. Frontend validation with user feedback
3. Better error messages

The system is **relatively safe** from crashes but **not safe** from incorrect calculations due to invalid input.

