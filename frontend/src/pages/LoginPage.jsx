import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearAuthError } from '../store/slices/authSlice';
import { addToast } from '../store/slices/uiSlice';
import { Field } from '../components/ui/Field';
import { RippleBtn } from '../components/ui/RippleBtn';

export function LoginPage() {
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");
  const [errs, setErrs] = useState({});
  const [showPass, setShowPass] = useState(false);
  const dispatch = useDispatch();
  const { loading, error: authError } = useSelector((state) => state.auth);

  const validate = () => {
    const e = {};
    if (!phone) e.phone = "Phone number is required";
    else if (!/^[6-9]\d{9}$/.test(phone))
      e.phone = "Enter valid 10-digit mobile number";
    if (!pass) e.pass = "Password is required";
    else if (pass.length < 6) e.pass = "Min 6 characters required";
    return e;
  };

  const submit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrs(validationErrors);
      return;
    }

    setErrs({});
    const result = await dispatch(login({ phone, password: pass }));
    if (login.fulfilled.match(result)) {
      dispatch(addToast({ msg: `Welcome back, ${result.payload.teacher.name}! 👋`, type: "success" }));
    } else {
      dispatch(addToast({ msg: result.payload || "Invalid credentials.", type: "error" }));
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-5xl bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 flex overflow-hidden min-h-[600px]">
        {/* Left Side Branding */}
        <div className="hidden lg:flex flex-col w-5/12 bg-slate-900 p-12 text-white relative overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-orange-600 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-pulse" />
          <div className="absolute top-1/2 -right-32 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-[pulse_4s_ease-in-out_infinite]" />

          <div className="relative z-10 flex items-center gap-3 font-bold text-2xl tracking-tight mb-auto">
            <span className="text-orange-500">✦</span>
            <span>EduFlow</span>
          </div>

          <div className="relative z-10 my-auto">
            <div className="text-orange-400 font-bold tracking-widest text-sm mb-6 uppercase">Next-Gen LMS</div>
            <h1 className="text-5xl font-extrabold leading-tight mb-8">
              Empowering<br />
              <em className="text-orange-400 font-serif italic mb-2 block">educators.</em>
              Inspiring<br />
              <em className="text-orange-400 font-serif italic"> learners.</em>
            </h1>

            <div className="flex flex-wrap gap-3 mt-12">
              {[
                ["🎯", "Smart Attendance"],
                ["📊", "Live Analytics"],
                ["🤖", "AI Insights"],
                ["📅", "Auto Scheduling"]
              ].map(([icon, label]) => (
                <div key={label} className="bg-white/10 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 flex items-center gap-2 text-sm font-medium">
                  <span>{icon}</span> {label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side Form */}
        <div className="w-full lg:w-7/12 p-8 sm:p-12 lg:p-16 flex flex-col justify-center relative">
          <div className="lg:hidden flex items-center gap-2 font-bold text-xl mb-12">
            <span className="text-orange-600">✦</span>
            <span className="text-slate-800">EduFlow</span>
          </div>

          <h2 className="text-3xl font-extrabold text-slate-800 mb-2">Teacher Portal</h2>
          <p className="text-slate-500 mb-8">Sign in to manage your classes & students</p>

          <div className="bg-orange-50 border border-orange-100 rounded-xl px-5 py-4 flex items-center gap-3 text-orange-800 text-sm mb-8">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
            </span>
            <span><strong>Demo:</strong> 9876543210 &nbsp;/&nbsp; teacher123</span>
          </div>

          {authError && (
            <div className="mb-5 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
              {authError}
            </div>
          )}

          <form onSubmit={submit}>
            <Field label="Phone Number" icon="📱" error={errs.phone}>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                value={phone}
                maxLength={10}
                onChange={(e) => {
                  setPhone(e.target.value.replace(/\D/g, ""));
                  setErrs((p) => ({ ...p, phone: "" }));
                  if (authError) dispatch(clearAuthError());
                }}
              />
            </Field>

            <Field
              label="Password"
              icon="🔒"
              error={errs.pass}
              suffix={
                <button
                  type="button"
                  className="hover:text-slate-600 transition-colors"
                  onClick={() => setShowPass(!showPass)}
                >
                  {showPass ? "🙈" : "👁"}
                </button>
              }
            >
              <input
                type={showPass ? "text" : "password"}
                placeholder="Your password"
                value={pass}
                onChange={(e) => {
                  setPass(e.target.value);
                  setErrs((p) => ({ ...p, pass: "" }));
                  if (authError) dispatch(clearAuthError());
                }}
              />
            </Field>

            <RippleBtn
              type="submit"
              className="w-full mt-6"
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Authenticating…
                </>
              ) : (
                <>
                  Sign In
                  <span className="font-serif ml-1">→</span>
                </>
              )}
            </RippleBtn>
          </form>
        </div>
      </div>
    </div>
  );
}
