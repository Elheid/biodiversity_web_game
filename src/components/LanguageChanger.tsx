import { Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material"
import { useLanguageContext } from "../context/LanguageProvider"
import { LANGUAGE } from "../config";


export const LanguageChanger = () => {
    const { language, setLanguage } = useLanguageContext();


    const handleChange = (event: SelectChangeEvent) => {
        setLanguage(event.target.value as LANGUAGE);
    };

    const languages = Object.values(LANGUAGE);

    return (
        <Container sx={{ minWidth: "10vw" }}>
                    <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">Language</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={language}
                            label="Age"
                            onChange={handleChange}
                        >
                            {languages.map((item, index) =>
                                <MenuItem key={index} value={item.toUpperCase()}>{item}</MenuItem>
                            )}
                        </Select>
                    </FormControl>
        </Container>
    )
}