import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { fontSize, margin, padding, radius } from '@/constants/style'
import colors from '@/constants/color'
import { IconSearch } from '@tabler/icons-react-native'

type SearchProps = {
    placeholder?: string
    onSearch?: (text: string) => void
}

const Search: React.FC<SearchProps> = ({ placeholder, onSearch }) => {
    const [searchText, setSearchText] = useState('')

    const handleSearch = () => {
        if (onSearch) {
            onSearch(searchText)
        }
    }

    const handleChangeText = (text: string) => {
        setSearchText(text)
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={colors.dark.text.secondary}
                    value={searchText}
                    onChangeText={handleChangeText}
                    onSubmitEditing={handleSearch}
                />
                <TouchableOpacity onPress={handleSearch}>
                    <IconSearch style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Search

const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.dark.input.backgroundColor,
        borderRadius: radius.md,
        borderWidth: 2,
        borderColor: colors.dark.input.borderColor
    },
    input: {
        flex: 1,
        color: colors.dark.white,
        fontSize: fontSize.md,
        paddingVertical: padding.sm,
        paddingHorizontal: padding.sm
    },
    icon: {
        margin: margin.sm,
        color: colors.dark.text.primary
    }
})
