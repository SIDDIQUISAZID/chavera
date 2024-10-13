import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import { Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import "../../css/register.css";
import { useForgetPasswordMutation } from "../../features/auth/authAPI";
import { toast } from "react-toastify";
import { MAIL } from "../../assets/icons";
import { CircleLoader } from "../../components/Loader";

export default function ForgetPassword(props) {
  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
  });

  const [forgetPassword, { isLoading: isLoadingUser }] =
    useForgetPasswordMutation();

  const formik = useFormik({
    initialValues: { email: "" },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await forgetPassword(values).unwrap();
        if (response?.status === 200) {
          toast.success(response?.message);
          props?.getUserEmail(values?.email);
          props.handleSetActiveWindow("verification");
        } else {
          toast.error(response?.message);
        }
      } catch (err) {
        toast.error(err?.data?.message || err.status);
      }
    },
  });

  return (
    <div className="p-4">
      <div className="header pl-3.5 font-poppins_cf text-xl font-medium">
        Forgot Your Password
      </div>
      <div className="mb-4 mt-2 pl-[15px] font-poppins_cf text-xs font-normal text-theme-grey ">
        Please provide the email address to which you would like your password
        reset information sent.
      </div>
      <div className="font-poppins_cf text-xs font-normal ">
        <form
          onSubmit={formik.handleSubmit}
          className="registerForm font-poppins_cf"
        >
          <TextField
            id="email"
            name="email"
            placeholder="Email Id"
            type="email"
            variant="standard"
            onChange={formik.handleChange}
            value={formik.values.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MAIL fontSize="small" />
                </InputAdornment>
              ),
              style: {
                fontSize: "0.9rem",
                fontWeight: "400",
                fontFamily: "Poppins",
                padding: "5px",
              },
            }}
            style={{
              marginBottom: "4%",
              fontSize: "0.8rem",
              fontFamily: "Poppins",
            }}
          />
          <Button
            style={{
              background: "#EC1944",
              marginBottom: "10px",
              marginTop: "5px",
              color: "white",
              textTransform: "none",
              opacity: formik.errors.email ? 0.6 : 1,
            }}
            disabled={formik.errors.email}
            type="submit"
            variant="contained"
          >
            {isLoadingUser ? (
              <>
                <div className="mr-2">Loading.....</div>
                <CircleLoader className="ml-auto" />
              </>
            ) : (
              <>Send Verification Code</>
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}
