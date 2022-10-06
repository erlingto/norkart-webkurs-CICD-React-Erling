import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { fritekstsok } from "../api/fritekstsokapi";
import Autocomplete from "@mui/material/Autocomplete";
import { styled } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";

const CustomTextField = styled(TextField)({
  backgroundColor: "white",
  borderRadius: 10,
  position: "relative",
});

export const FritekstSok = (props) => {
  const [selectedAdress, setSelectedAdress] = useState();
  const apiKeyState = "";
  const [inputValue, setInputValue] = useState("");
  const [adressOptions, setAdressOptions] = useState([]);
  const [options, setOptions] = useState([]);

  const fetchFromFritekstsok = async (input) => {
    const results = await fritekstsok(input, apiKeyState);
    setOptions(results);
  };

  useEffect(() => {
    if (inputValue === "") {
      setAdressOptions([]);
    }
    fetchFromFritekstsok(inputValue);
  }, [selectedAdress, inputValue]);

  useEffect(() => {
    let newOptions = [];

    if (selectedAdress) {
      newOptions = [selectedAdress];
    }
    {
      if (options) {
        newOptions = [...newOptions, ...options];
      }
      if (options.length == 1) {
        props.setInfo(options[0]);
      }
    }
    setAdressOptions(newOptions);
  }, [options]);

  return (
    <div>
      <Autocomplete
        id="fritekstsok-demo"
        options={adressOptions}
        value={selectedAdress}
        getOptionLabel={(s) => s.text}
        filterOptions={(x) => x}
        autoComplete
        includeInputInList
        filterSelectedOptions
        onChange={(_, newValue) => {
          setAdressOptions(
            newValue ? [newValue, ...adressOptions] : adressOptions
          );
          setSelectedAdress(newValue);
        }}
        onInputChange={(_, newInputValue) => {
          setInputValue(newInputValue);
        }}
        renderInput={(params) => (
          <CustomTextField
            {...params}
            color="secondary"
            id="standard-basic"
            variant="outlined"
            placeholder="Search Address"
            size="small"
            InputProps={{
              ...params.InputProps,
              endAdornment: <SearchIcon />,
            }}
          />
        )}
      />
    </div>
  );
};