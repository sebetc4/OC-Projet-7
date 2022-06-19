export const getTheme = (colorMode) => {
    return {
        palette: {
            mode: colorMode,
            ...(colorMode === 'light' ?
                {
                    primary: {
                        main: '#C8525B'
                    },
                    secondary: {
                        main: '#2b60d0'
                    },
                    inactiveLink: {
                        main: 'rgb(100, 100, 100)',
                    },
                    background: {
                        main: '#f0f2f5',
                        section: '#fff',
                        article: '#f6f6f6',
                        header: '#fff',
                        top: '#d8d8d8'
                    },
                    toggleColorMode: {
                        main: 'rgb(0, 0, 0)'
                    }
                }
                :
                {
                    primary: {
                        main: '#C8525B'
                    },
                    secondary: {
                        main: '#7195e1'
                    },
                    inactiveLink: {
                        main: 'rgb(100, 100, 100)',
                    },
                    background: {
                        main: 'rgb(24, 25, 26)',
                        section: 'rgb(61, 62, 63)',
                        article: 'rgb(36, 37, 38)',
                        header: 'rgb(36, 37, 38)',
                        top: 'rgb(36, 37, 38)'
                    },
                    toggleColorMode: {
                        main: '#fff'
                    }
                }),
        },
    }
}

