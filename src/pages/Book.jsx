import { useState, useRef, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Stack,
  Paper,
  Autocomplete,
  IconButton,
  TextField,
} from "@mui/material";
import CustomTextField from "../components/CustomTextField";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useFormik } from "formik";
import { enqueueSnackbar } from "notistack";

const times = [
  { time: "2:00 PM", end: "3:00 PM" },
  { time: "3:00 PM", end: "4:00 PM" },
  { time: "4:00 PM", end: "5:00 PM" },
  { time: "5:00 PM", end: "6:00 PM" },
  { time: "6:00 PM", end: "7:00 PM" },
];
const Book = () => {
  const [selectedTime, setSelectedTime] = useState("6:00 PM");
  const [date, setDate] = useState("2025-08-04");
  const [timezone, setTimezone] = useState("");
  const scrollRef = useRef(null);
  const [haveTime, setHaveTime] = useState(false);

  const scrollAmount = 200; // px
  const handleScrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };
  const handleScrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  const value = localStorage.getItem("bookingData");

  useEffect(() => {
    if (value) {
      setHaveTime(true);
    }
  }, [value]);

  const formik = useFormik({
    initialValues: {
      name: "",
      mobile: "",
      skype: "",
      email: "",
      notes: "",
    },
    onSubmit: (values) => {
      console.log("Form submitted!", values);
      enqueueSnackbar("Booking successful!", { variant: "success" });
    },
  });

  return (
    <Box
      sx={{
        minHeight: "90vh",
        bgcolor: "background.default",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {haveTime ? (
        <Box
          sx={{
            width: { xs: "98%", sm: "80%" },
            mx: "auto",
            mt: { xs: 4, sm: 8 },
            mb: 6,
            p: { xs: 2, sm: 4 },
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Box sx={{ width: "100%" }}>
            <Typography
              variant="h5"
              fontWeight={700}
              // align="start"
              sx={{ mb: 1, color: "#793e2f" }}
            >
              Add details
            </Typography>
          </Box>
          <Typography
            variant="subtitle1"
            align="center"
            sx={{
              mb: 3,
              backgroundColor: "#793e2f",
              color: "white",
              fontWeight: 400,
              fontSize: "0.75rem",
              borderRadius: 3,
              padding: "1px 8px",
            }}
          >
            {(() => {
              const bookingData = JSON.parse(
                localStorage.getItem("bookingData")
              );
              if (!bookingData) return "";
              const dateObj = new Date(bookingData.date);
              const dateStr = dateObj.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
              return `Selected date is ${dateStr} at ${bookingData.time}`;
            })()}
          </Typography>
          <Box
            component="form"
            sx={{ width: "100%" }}
            onSubmit={formik.handleSubmit}
          >
            <Box
              sx={{
                mb: 2,
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                rowGap: 4,
                columnGap: 2,
              }}
            >
              <CustomTextField
                label="Your Name"
                required
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
              <CustomTextField
                label="Mobile"
                required
                type="number"
                name="mobile"
                value={formik.values.mobile}
                onChange={formik.handleChange}
              />
              <CustomTextField
                label="Skype"
                name="skype"
                value={formik.values.skype}
                onChange={formik.handleChange}
              />
              <CustomTextField
                label="Email Address"
                required
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
              />
              <CustomTextField
                label="Notes"
                multiline
                minRows={3}
                name="notes"
                value={formik.values.notes}
                onChange={formik.handleChange}
              />
            </Box>
            <Stack direction="row" spacing={2} justifyContent="end">
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#793e2f",
                  color: "#fff",
                  borderRadius: 2,
                  minWidth: 120,
                  textTransform: "none",
                  fontWeight: 500,
                  boxShadow: 0,
                  "&:hover": { bgcolor: "#793e2f" },
                }}
                onClick={() => {
                  localStorage.removeItem("bookingData");
                  setHaveTime(false);
                }}
              >
                Go back
              </Button>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  bgcolor: "#793e2f",
                  color: "#fff",
                  borderRadius: 2,
                  minWidth: 120,
                  textTransform: "none",
                  fontWeight: 500,
                  boxShadow: 0,
                  "&:hover": { bgcolor: "#793e2f" },
                }}
              >
                Submit
              </Button>
            </Stack>
          </Box>
        </Box>
      ) : (
        <>
          <Box
            sx={{
              width: { xs: "98%", sm: "80%" },
              mx: "auto",
              borderRadius: 6,
              bgcolor: "rgba(255,255,255,0.85)",
              p: { xs: 2, sm: 4 },
              mt: { xs: 4, sm: 8 },
              mb: 6,
              position: "relative",
              border: "1px solid rgba(255,255,255,0.18)",
            }}
          >
            <Typography
              variant="h5"
              fontWeight={700}
              align="center"
              sx={{ mb: 4, color: "#793e2f", letterSpacing: 0.5 }}
            >
              Book an appointment
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
                justifyContent="center"
              >
                <TextField
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  size="small"
                  sx={{
                    minWidth: 180,
                    borderRadius: 2,
                    boxShadow: 1,
                  }}
                />

                <Autocomplete
                  options={[
                    "Asia/Calcutta",
                    "America/New_York",
                    "Europe/London",
                  ]}
                  value={timezone}
                  onChange={(e, newValue) => setTimezone(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Timezone"
                      variant="outlined"
                      size="small"
                      sx={{ minWidth: 180, borderRadius: 2, boxShadow: 1 }}
                    />
                  )}
                />
              </Stack>
            </Box>
            <Box
              sx={{
                mb: 3,
                width: { xs: "98%", sm: "100%", md: "80%", lg: "60%" },
                margin: "0 auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <IconButton
                aria-label="scroll left"
                onClick={handleScrollLeft}
                sx={{ mr: 0.5 }}
              >
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <Box
                ref={scrollRef}
                sx={{
                  display: "flex",
                  overflowX: "auto",
                  gap: 2,
                  px: 1,
                  scrollbarWidth: "none",
                  scrollBehavior: "smooth",
                  "&::-webkit-scrollbar": { display: "none" },
                  flex: 1,
                }}
              >
                {times.map(({ time, end }) => {
                  // Parse selected date and slot time
                  const selectedDateObj = new Date(date);
                  const today = new Date(); // keep original current time
                  let slotDateTime = new Date(selectedDateObj);
                  // Convert time string to 24hr
                  const [slotHour, slotMin, slotPeriod] = time
                    .match(/(\d+):(\d+)\s*(AM|PM)/i)
                    .slice(1);
                  let hour = parseInt(slotHour, 10);
                  if (slotPeriod.toUpperCase() === "PM" && hour !== 12)
                    hour += 12;
                  if (slotPeriod.toUpperCase() === "AM" && hour === 12)
                    hour = 0;
                  slotDateTime.setHours(hour, parseInt(slotMin, 10), 0, 0);
                  // Disable if date is before today, or if today and time is passed
                  const isDisabled =
                    selectedDateObj <
                      new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        today.getDate()
                      ) ||
                    (selectedDateObj.toDateString() === today.toDateString() &&
                      slotDateTime < today);
                  return (
                    <Paper
                      key={time}
                      elevation={selectedTime === time ? 8 : 2}
                      sx={{
                        px: 3,
                        py: 2,
                        bgcolor: isDisabled
                          ? "#e3e8ee"
                          : selectedTime === time
                          ? "#793e2f"
                          : "#fff",
                        color: isDisabled
                          ? "#6b7280"
                          : selectedTime === time
                          ? "#fff"
                          : "#222",
                        cursor: isDisabled ? "not-allowed" : "pointer",
                        borderRadius: 3,
                        minWidth: 90,
                        textAlign: "center",
                        opacity: isDisabled ? 0.7 : 1,
                        transition: "all 0.2s",
                        flex: "0 0 auto",
                      }}
                      onClick={() => !isDisabled && setSelectedTime(time)}
                    >
                      <Typography
                        variant="subtitle1"
                        fontWeight={700}
                        sx={{ fontSize: "1.1rem" }}
                      >
                        {time}
                      </Typography>
                      <Typography
                        variant="caption"
                        color={
                          isDisabled
                            ? "#6b7280"
                            : selectedTime === time
                            ? "#fff"
                            : "#222"
                        }
                        sx={{ fontSize: "0.95rem" }}
                      >
                        to {end}
                      </Typography>
                    </Paper>
                  );
                })}
              </Box>
              <IconButton
                aria-label="scroll right"
                onClick={handleScrollRight}
                sx={{ ml: 0.5 }}
              >
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </Box>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                mt: 3,
              }}
            >
              <Button
                variant="contained"
                sx={{
                  bgcolor: "#793e2f",
                  color: "#fff",
                  borderRadius: 3,
                  minWidth: 200,
                  py: 0.8,
                  fontWeight: 700,
                  fontSize: ".85rem",
                  boxShadow: 3,
                  textTransform: "none",
                  mb: 1.5,
                  "&:hover": { bgcolor: "#5a2c1f" },
                }}
                onClick={() => {
                  const bookingData = {
                    date,
                    timezone,
                    time: selectedTime,
                  };
                  localStorage.setItem(
                    "bookingData",
                    JSON.stringify(bookingData)
                  );
                  setHaveTime(true);
                }}
              >
                Next
              </Button>
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Book;
