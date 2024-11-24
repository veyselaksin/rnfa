// change default spacing to be more flexible
type Spacing = 'sm' | 'md' | 'lg' | 'xl'

type SpacingRecord = Record<Spacing, number>

export const radius = {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24,
    full: 9999
}

export const fontSize = {
    sm: 12,
    md: 16,
    lg: 24
}

// Base size for spacing calculations
const BASE_SPACING = 12

export const padding: SpacingRecord = {
    sm: BASE_SPACING,
    md: BASE_SPACING * 2,
    lg: BASE_SPACING * 3,
    xl: BASE_SPACING * 4
}

export const margin: SpacingRecord = {
    sm: BASE_SPACING,
    md: BASE_SPACING * 2,
    lg: BASE_SPACING * 3,
    xl: BASE_SPACING * 4
}

export const gap: SpacingRecord = {
    sm: 4,
    md: 8,
    lg: 16,
    xl: 24
}
