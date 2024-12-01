// change default spacing to be more flexible
type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

type SpacingRecord = Record<Spacing, number>

export const radius = {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999
}

export const fontSize = {
    xs: 10,
    sm: 12,
    md: 16,
    lg: 24,
    xl: 32
}

// Base size for spacing calculations
const BASE_SPACING = 12

export const padding: SpacingRecord = {
    xs: BASE_SPACING / 2,
    sm: BASE_SPACING,
    md: BASE_SPACING * 2,
    lg: BASE_SPACING * 3,
    xl: BASE_SPACING * 4
}

export const margin: SpacingRecord = {
    xs: BASE_SPACING / 2,
    sm: BASE_SPACING,
    md: BASE_SPACING * 2,
    lg: BASE_SPACING * 3,
    xl: BASE_SPACING * 4
}

export const gap: SpacingRecord = {
    xs: 2,
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24
}
