import styled from "@emotion/styled";
import TextField from "@mui/material/TextField";

const StyledTextField = styled(TextField)({
  "& .MuiInputBase-root": {
    fontSize: "0.90rem",
    backgroundColor: "#F8FAFC",
    marginTop: "0px",
  },
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#793e2f",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#793e2f",
  },
  "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#793e2f !important",
  },
  "& .Mui-focused .MuiInputLabel-root": {
    color: "#793e2f !important",
  },
});

export default function CustomTextField({
  label,
  value,
  onChange,
  type,
  multiline,
  minRows,
  helperText,
  name,
  required = false,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <StyledTextField
        fullWidth
        name={name}
        label={label}
        required={required}
        type={type}
        value={value}
        onChange={onChange}
        autoComplete="off"
        variant="outlined"
        multiline={multiline}
        minRows={minRows}
        helperText={helperText}
        size="small"
        // {...other}
        InputLabelProps={{
          style: {
            color: "black",
            fontSize: "0.90rem",
          },
        }}
        InputProps={{
          style: {
            fontSize: "0.90rem",
          },
        }}
      />
    </div>
  );
}
