import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { useLanguageContext } from "../context/LanguageProvider";
import { LANGUAGE } from "../config";

/**
 * LanguageChanger component renders a dropdown to select the application language.
 * It uses the LanguageContext to get and set the current language.
 */
export const LanguageChanger = () => {
    const { language, setLanguage } = useLanguageContext();

    /**
     * Handles language selection change.
     * @param event - The select change event.
     */
    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as LANGUAGE);
    };

    const languages = Object.values(LANGUAGE);

    return (
        <Container sx={{ minWidth: "10vw" }}>
            <FormControl fullWidth>
                <InputLabel id="lang-select-label">Language</InputLabel>
                <Select
                    labelId="lang-select-label"
                    id="lang-select"
                    value={language}
                    label="Language"
                    onChange={handleChange}
                >
                    {languages.map((item, index) => (
                        <MenuItem key={index} value={item.toUpperCase()}>
                            {item}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Container>
    );
};
