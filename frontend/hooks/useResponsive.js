import { useWindowDimensions } from 'react-native';

/**
 * Hook to detect and monitor screen breakpoints for responsive layouts
 */
export const useResponsive = () => {
    const { width } = useWindowDimensions();

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;
    const isDesktop = width >= 1024;

    return {
        width,
        isMobile,
        isTablet,
        isDesktop,
        // Helper to get max width for containers
        maxWidth: isDesktop ? 1200 : isTablet ? 720 : '100%',
        alignSelf: isMobile ? 'auto' : 'center'
    };
};
