import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useApp, DEMO_ACCOUNTS } from '../context/AppContext';
import { GuestNavbar } from './LandingPage';

export default function LoginPage() {
  const { signIn, userRole } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  // Active view: 'login' | 'signup' | 'verify'
  const [activeTab, setActiveTab] = useState(() => {
    if (location.state?.tab) return location.state.tab;
    const searchParam = new URLSearchParams(location.search).get('tab');
    if (searchParam === 'signup' || searchParam === 'register') return 'signup';
    return 'login';
  });

  useEffect(() => {
    if (location.state?.tab) {
      setActiveTab(location.state.tab);
    } else {
      const searchParam = new URLSearchParams(location.search).get('tab');
      if (searchParam === 'signup' || searchParam === 'register') {
        setActiveTab('signup');
      } else if (searchParam === 'login') {
        setActiveTab('login');
      }
    }
  }, [location.state, location.search]);

  // Always scroll to top whenever activeTab or view changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [activeTab]);

  // Login Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginStatus, setLoginStatus] = useState(null);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);

  // Signup Form State
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [isSubmittingSignup, setIsSubmittingSignup] = useState(false);

  // Verification View State
  const [registeredEmail, setRegisteredEmail] = useState('maria.santos@sanpark.ph');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [toastSuccess, setToastSuccess] = useState(false);
  const [showChangeEmailModal, setShowChangeEmailModal] = useState(false);
  const [newEmailInput, setNewEmailInput] = useState('');

  // Forgot Password Modal State
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetStatus, setResetStatus] = useState(false);
  const [isSubmittingReset, setIsSubmittingReset] = useState(false);

  // Resend cooldown timer
  useEffect(() => {
    let timer;
    if (resendCooldown > 0) {
      timer = setInterval(() => {
        setResendCooldown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [resendCooldown]);

  // Compute password strength (1 to 3)
  const getPasswordStrength = (pwd) => {
    if (!pwd) return 0;
    let score = 0;
    if (pwd.length >= 8) score += 1;
    if (/[A-Z]/.test(pwd) && /[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;
    return Math.max(1, score);
  };
  const pwdStrength = getPasswordStrength(signupPassword);

  // Validate signup email
  const validateEmailFormat = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  };

  // Quick fill demo account
  const handleQuickFill = (roleKey) => {
    const creds = DEMO_ACCOUNTS[roleKey];
    if (creds) {
      setLoginEmail(creds.email);
      setLoginPassword(creds.password);
      setLoginStatus({
        type: 'info',
        message: `Loaded credentials for ${creds.name} (${roleKey === 'admin' ? 'Administrator' : 'Driver Account'}). Click "Log In" to proceed.`
      });
    }
  };

  // Handle Login Submit
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setLoginStatus(null);

    if (!loginEmail.trim() || !loginPassword) {
      setLoginStatus({
        type: 'error',
        message: 'Please enter both your email address and password.'
      });
      return;
    }

    setIsSubmittingLogin(true);

    setTimeout(() => {
      setIsSubmittingLogin(false);
      const success = signIn(loginEmail, loginPassword);

      if (success) {
        setLoginStatus({
          type: 'success',
          message: 'Access granted. Redirecting to your dashboard...'
        });

        const target = loginEmail.toLowerCase().includes('admin') ? '/mall-manager' : '/find-parking';
        setTimeout(() => {
          navigate(location.state?.from || target, { replace: true });
        }, 500);
      } else {
        setLoginStatus({
          type: 'error',
          message: 'Invalid email or password. Use demo buttons above or check your credentials.'
        });
      }
    }, 600);
  };

  // Handle Signup Submit
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    setNameError(!signupName.trim());

    if (!signupEmail.trim() || !validateEmailFormat(signupEmail)) {
      setEmailError('Please enter a valid email address.');
      return;
    } else {
      setEmailError('');
    }

    if (signupPassword.length < 8) {
      return;
    }

    if (signupPassword !== signupConfirmPassword) {
      setPasswordMismatch(true);
      return;
    }
    setPasswordMismatch(false);

    setIsSubmittingSignup(true);

    setTimeout(() => {
      setIsSubmittingSignup(false);
      setRegisteredEmail(signupEmail);
      setNewEmailInput(signupEmail);
      setActiveTab('verify');
    }, 750);
  };

  // Handle Resend Verification
  const handleResendEmail = () => {
    if (resendCooldown > 0) return;
    setToastSuccess(true);
    setResendCooldown(45);
    setTimeout(() => {
      setToastSuccess(false);
    }, 4000);
  };

  // Handle Email Update in Modal
  const handleSaveNewEmail = (e) => {
    e.preventDefault();
    if (validateEmailFormat(newEmailInput)) {
      setRegisteredEmail(newEmailInput);
      setShowChangeEmailModal(false);
      handleResendEmail();
    }
  };

  // Handle Reset Password Submit
  const handleResetPasswordSubmit = (e) => {
    e.preventDefault();
    if (!validateEmailFormat(resetEmail)) return;

    setIsSubmittingReset(true);
    setTimeout(() => {
      setIsSubmittingReset(false);
      setResetStatus(true);
    }, 650);
  };

  // Top accent bar position
  const getProgressBarStyles = () => {
    if (activeTab === 'login') return { transform: 'translateX(0%)', width: '50%' };
    if (activeTab === 'signup') return { transform: 'translateX(100%)', width: '50%' };
    return { transform: 'translateX(0%)', width: '100%' };
  };

  return (
    <div className="bg-background font-body-md text-on-surface min-h-screen flex flex-col justify-between selection:bg-primary-container selection:text-on-primary-container">

      {/* Guest Navbar imported directly from LandingPage.jsx */}
      <GuestNavbar 
        onSignInClick={() => setActiveTab('login')}
        onReserveClick={() => setActiveTab('signup')}
      />

      {/* Main Authentication Container */}
      <main className="w-full flex-1 flex items-center justify-center px-container-margin pt-24 pb-space-lg">
        <div className="w-full max-w-md">
          <div className="flex flex-col w-full">

            {/* Subtle Ambient Glow Layer behind Auth Card */}
            <div className="relative w-full max-w-md mx-auto">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-72 h-44 bg-primary-container/15 rounded-full blur-3xl pointer-events-none -z-10" />

              {/* Main Auth Card Container */}
              <div className="relative w-full rounded-2xl bg-surface-container border border-surface-container-high/80 shadow-2xl overflow-hidden">

                {/* Top Accent Pulse Line */}
                <div className="w-full h-1 bg-surface-container-high relative overflow-hidden">
                  <div
                    className="absolute top-0 bottom-0 left-0 bg-primary-container transition-all duration-500 ease-out"
                    style={getProgressBarStyles()}
                  />
                </div>

                <div className="p-space-md sm:p-space-lg">

                  {/* Segmented Tab Switcher (Visible on Login & Signup) */}
                  {activeTab !== 'verify' && (
                    <div className="grid grid-cols-2 p-1 rounded-xl bg-surface-container-lowest gap-1 mb-space-md select-none border border-surface-container-high/40">
                      <button
                        type="button"
                        onClick={() => { setActiveTab('login'); setLoginStatus(null); }}
                        className={`py-2.5 px-3 rounded-lg text-center font-label-lg text-label-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === 'login'
                            ? 'bg-surface-container text-on-surface shadow-sm font-semibold'
                            : 'text-secondary hover:text-on-surface'
                          }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">login</span>
                        <span>Log In</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => { setActiveTab('signup'); setLoginStatus(null); }}
                        className={`py-2.5 px-3 rounded-lg text-center font-label-lg text-label-lg transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${activeTab === 'signup'
                            ? 'bg-surface-container text-on-surface shadow-sm font-semibold'
                            : 'text-secondary hover:text-on-surface'
                          }`}
                      >
                        <span className="material-symbols-outlined text-[18px]">person_add</span>
                        <span>Create Account</span>
                      </button>
                    </div>
                  )}

                  {/* Quick-Fill Demo Profiles Banner */}
                  {activeTab === 'login' && (
                    <div className="mb-space-md p-2.5 rounded-xl bg-surface-container-lowest/80 border border-surface-container-high/60">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider flex items-center gap-1">
                          <span className="material-symbols-outlined text-primary text-[14px]">bolt</span> Quick Demo Fill:
                        </span>
                        <span className="text-[10px] text-secondary font-mono">1-click test</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuickFill('user')}
                          className="py-1 px-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm border border-surface-container-highest transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px] text-primary">directions_car</span>
                          <span>Driver Demo</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleQuickFill('admin')}
                          className="py-1 px-2 rounded-lg bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-sm text-label-sm border border-surface-container-highest transition-colors flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[15px] text-emerald-400">admin_panel_settings</span>
                          <span>Admin Demo</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {/* ======================= 1. LOG IN PANEL ======================= */}
                  {activeTab === 'login' && (
                    <div className="transition-all duration-300">
                      <div className="mb-space-md">
                        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Welcome back</h1>
                        <p className="font-body-md text-body-md text-secondary mt-1">Log in to continue to your parking dashboard.</p>
                      </div>

                      {/* Status Banner */}
                      {loginStatus && (
                        <div
                          className={`mb-space-sm p-3 rounded-lg flex items-start gap-2.5 text-body-sm text-on-surface border ${loginStatus.type === 'error'
                              ? 'bg-red-950/40 border-red-500/40 text-red-200'
                              : loginStatus.type === 'success'
                                ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                                : 'bg-surface-container-highest border-surface-container-high'
                            }`}
                        >
                          <span className={`material-symbols-outlined text-[18px] shrink-0 mt-0.5 ${loginStatus.type === 'error' ? 'text-red-400' : loginStatus.type === 'success' ? 'text-emerald-400' : 'text-primary-container'
                            }`}>
                            {loginStatus.type === 'error' ? 'error' : loginStatus.type === 'success' ? 'check_circle' : 'info'}
                          </span>
                          <span>{loginStatus.message}</span>
                        </div>
                      )}

                      <form onSubmit={handleLoginSubmit} className="space-y-4" noValidate>
                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="block font-label-md text-label-md text-secondary" htmlFor="login-email">
                            Email Address
                          </label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
                              mail
                            </span>
                            <input
                              id="login-email"
                              type="email"
                              required
                              value={loginEmail}
                              onChange={(e) => setLoginEmail(e.target.value)}
                              placeholder="driver@example.com"
                              className="w-full bg-surface-container-lowest text-on-surface placeholder:text-secondary-container pl-10 pr-3.5 py-3 rounded-lg font-body-md text-body-md border border-surface-container-high outline-none focus:border-primary-container transition-colors duration-150"
                            />
                          </div>
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                          <label className="block font-label-md text-label-md text-secondary" htmlFor="login-password">
                            Password
                          </label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
                              lock
                            </span>
                            <input
                              id="login-password"
                              type={showLoginPassword ? 'text' : 'password'}
                              required
                              value={loginPassword}
                              onChange={(e) => setLoginPassword(e.target.value)}
                              placeholder="Enter your password"
                              className="w-full bg-surface-container-lowest text-on-surface placeholder:text-secondary-container pl-10 pr-10 py-3 rounded-lg font-body-md text-body-md border border-surface-container-high outline-none focus:border-primary-container transition-colors duration-150"
                            />
                            <button
                              type="button"
                              aria-label="Toggle password visibility"
                              onClick={() => setShowLoginPassword(!showLoginPassword)}
                              className="absolute right-3 text-secondary hover:text-on-surface p-1 rounded transition-colors flex items-center justify-center cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {showLoginPassword ? 'visibility_off' : 'visibility'}
                              </span>
                            </button>
                          </div>
                        </div>

                        {/* Options Row */}
                        <div className="flex items-center justify-between pt-1">
                          <label className="flex items-center gap-2 cursor-pointer select-none">
                            <input
                              type="checkbox"
                              checked={rememberMe}
                              onChange={(e) => setRememberMe(e.target.checked)}
                              className="accent-primary-container w-4 h-4 rounded cursor-pointer bg-surface-container-lowest"
                            />
                            <span className="font-body-sm text-body-sm text-secondary hover:text-on-surface transition-colors">
                              Remember me
                            </span>
                          </label>

                          <button
                            type="button"
                            onClick={() => { setShowForgotPasswordModal(true); setResetStatus(false); }}
                            className="font-label-md text-label-md text-primary hover:text-on-surface transition-colors focus:outline-none cursor-pointer"
                          >
                            Forgot password?
                          </button>
                        </div>

                        {/* Submit CTA */}
                        <button
                          type="submit"
                          disabled={isSubmittingLogin}
                          className="w-full mt-2 py-3 px-4 bg-primary-container hover:opacity-90 active:scale-[0.99] text-on-primary-container font-headline-sm text-headline-sm rounded-xl transition-all duration-150 shadow-md shadow-primary-container/25 flex items-center justify-center gap-2 font-semibold cursor-pointer disabled:opacity-50"
                        >
                          {isSubmittingLogin ? (
                            <>
                              <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                              <span>Verifying Credentials...</span>
                            </>
                          ) : (
                            <>
                              <span>Log In</span>
                              <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                            </>
                          )}
                        </button>
                      </form>

                      {/* Social Divider */}
                      <div className="relative my-space-md text-center">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full bg-surface-container-high h-[1px]" />
                        </div>
                        <span className="relative bg-surface-container px-3 text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                          or
                        </span>
                      </div>

                      {/* Social Button */}
                      <button
                        type="button"
                        onClick={() => handleQuickFill('user')}
                        className="w-full py-3 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high border border-surface-container-high transition-colors duration-150 flex items-center justify-center gap-3 text-on-surface font-label-lg text-label-lg font-medium shadow-sm cursor-pointer"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                        </svg>
                        <span>Continue with Google</span>
                      </button>

                      {/* Switch Tab Hint */}
                      <div className="mt-space-md text-center">
                        <p className="font-body-sm text-body-sm text-secondary">
                          Don't have an account?
                          <button
                            type="button"
                            onClick={() => { setActiveTab('signup'); setLoginStatus(null); }}
                            className="font-label-md text-label-md text-primary hover:text-on-surface transition-colors font-semibold ml-1 underline decoration-primary-container/40 underline-offset-4 cursor-pointer"
                          >
                            Create one
                          </button>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ======================= 2. CREATE ACCOUNT PANEL ======================= */}
                  {activeTab === 'signup' && (
                    <div className="transition-all duration-300">
                      <div className="mb-space-md">
                        <h1 className="font-headline-lg text-headline-lg text-on-surface font-bold">Create your account</h1>
                        <p className="font-body-md text-body-md text-secondary mt-1">Enter your details to get started with instant parking access.</p>
                      </div>

                      <form onSubmit={handleSignupSubmit} className="space-y-4" noValidate>
                        {/* Full Name */}
                        <div className="space-y-1.5">
                          <label className="block font-label-md text-label-md text-secondary" htmlFor="signup-name">
                            Full Name
                          </label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
                              person
                            </span>
                            <input
                              id="signup-name"
                              type="text"
                              required
                              value={signupName}
                              onChange={(e) => { setSignupName(e.target.value); setNameError(false); }}
                              placeholder="Elena Rostova"
                              className={`w-full bg-surface-container-lowest text-on-surface placeholder:text-secondary-container pl-10 pr-3.5 py-3 rounded-lg font-body-md text-body-md border outline-none transition-colors duration-150 ${nameError ? 'border-red-500' : 'border-surface-container-high focus:border-primary-container'
                                }`}
                            />
                          </div>
                          {nameError && (
                            <p className="font-body-sm text-body-sm text-red-400 flex items-center gap-1 mt-1">
                              <span className="material-symbols-outlined text-[16px]">error</span>
                              <span>Please enter your full name.</span>
                            </p>
                          )}
                        </div>

                        {/* Email */}
                        <div className="space-y-1.5">
                          <label className="block font-label-md text-label-md text-secondary" htmlFor="signup-email">
                            Email Address
                          </label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
                              mail
                            </span>
                            <input
                              id="signup-email"
                              type="email"
                              required
                              value={signupEmail}
                              onChange={(e) => { setSignupEmail(e.target.value); setEmailError(''); }}
                              placeholder="driver@example.com"
                              className={`w-full bg-surface-container-lowest text-on-surface placeholder:text-secondary-container pl-10 pr-3.5 py-3 rounded-lg font-body-md text-body-md border outline-none transition-colors duration-150 ${emailError ? 'border-red-500' : 'border-surface-container-high focus:border-primary-container'
                                }`}
                            />
                          </div>
                          {emailError && (
                            <p className="font-body-sm text-body-sm text-red-400 flex items-center gap-1 mt-1">
                              <span className="material-symbols-outlined text-[16px]">error</span>
                              <span>{emailError}</span>
                            </p>
                          )}
                        </div>

                        {/* Password */}
                        <div className="space-y-1.5">
                          <label className="block font-label-md text-label-md text-secondary" htmlFor="signup-password">
                            Password
                          </label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
                              lock
                            </span>
                            <input
                              id="signup-password"
                              type={showSignupPassword ? 'text' : 'password'}
                              required
                              value={signupPassword}
                              onChange={(e) => setSignupPassword(e.target.value)}
                              placeholder="At least 8 characters"
                              className="w-full bg-surface-container-lowest text-on-surface placeholder:text-secondary-container pl-10 pr-10 py-3 rounded-lg font-body-md text-body-md border border-surface-container-high outline-none focus:border-primary-container transition-colors duration-150"
                            />
                            <button
                              type="button"
                              aria-label="Toggle password visibility"
                              onClick={() => setShowSignupPassword(!showSignupPassword)}
                              className="absolute right-3 text-secondary hover:text-on-surface p-1 rounded transition-colors flex items-center justify-center cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {showSignupPassword ? 'visibility_off' : 'visibility'}
                              </span>
                            </button>
                          </div>

                          {/* Dynamic Strength Bars */}
                          <div className="flex items-center gap-1.5 pt-1">
                            <div className={`h-1 flex-1 rounded-full transition-colors ${pwdStrength >= 1 ? (pwdStrength === 1 ? 'bg-amber-400' : 'bg-emerald-400') : 'bg-surface-container-high'}`} />
                            <div className={`h-1 flex-1 rounded-full transition-colors ${pwdStrength >= 2 ? (pwdStrength === 2 ? 'bg-amber-400' : 'bg-emerald-400') : 'bg-surface-container-high'}`} />
                            <div className={`h-1 flex-1 rounded-full transition-colors ${pwdStrength >= 3 ? 'bg-emerald-400' : 'bg-surface-container-high'}`} />
                          </div>
                          <p className="font-body-sm text-body-sm text-secondary">
                            {pwdStrength === 0 && 'Password must be at least 8 characters.'}
                            {pwdStrength === 1 && 'Fair — add capital letters & numbers.'}
                            {pwdStrength === 2 && 'Good — add symbols to maximize security.'}
                            {pwdStrength >= 3 && 'Strong password.'}
                          </p>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-1.5">
                          <label className="block font-label-md text-label-md text-secondary" htmlFor="signup-confirm-password">
                            Confirm Password
                          </label>
                          <div className="relative flex items-center">
                            <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
                              lock_reset
                            </span>
                            <input
                              id="signup-confirm-password"
                              type={showSignupConfirmPassword ? 'text' : 'password'}
                              required
                              value={signupConfirmPassword}
                              onChange={(e) => { setSignupConfirmPassword(e.target.value); setPasswordMismatch(false); }}
                              placeholder="Re-enter your password"
                              className={`w-full bg-surface-container-lowest text-on-surface placeholder:text-secondary-container pl-10 pr-10 py-3 rounded-lg font-body-md text-body-md border outline-none transition-colors duration-150 ${passwordMismatch ? 'border-red-500' : 'border-surface-container-high focus:border-primary-container'
                                }`}
                            />
                            <button
                              type="button"
                              aria-label="Toggle password visibility"
                              onClick={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
                              className="absolute right-3 text-secondary hover:text-on-surface p-1 rounded transition-colors flex items-center justify-center cursor-pointer"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {showSignupConfirmPassword ? 'visibility_off' : 'visibility'}
                              </span>
                            </button>
                          </div>
                          {passwordMismatch && (
                            <p className="font-body-sm text-body-sm text-red-400 flex items-center gap-1 mt-1">
                              <span className="material-symbols-outlined text-[16px]">error</span>
                              <span>Passwords don't match.</span>
                            </p>
                          )}
                        </div>

                        {/* Terms */}
                        <p className="font-body-sm text-body-sm text-secondary pt-1">
                          By creating an account, you agree to SanPark's{' '}
                          <a className="text-primary hover:underline" href="#terms">Terms</a> and{' '}
                          <a className="text-primary hover:underline" href="#privacy">Privacy Policy</a>.
                        </p>

                        {/* Submit CTA */}
                        <button
                          type="submit"
                          disabled={isSubmittingSignup}
                          className="w-full py-3 px-4 bg-primary-container hover:opacity-90 active:scale-[0.99] text-on-primary-container font-headline-sm text-headline-sm rounded-xl transition-all duration-150 shadow-md shadow-primary-container/25 flex items-center justify-center gap-2 font-semibold cursor-pointer disabled:opacity-50"
                        >
                          {isSubmittingSignup ? (
                            <>
                              <span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span>
                              <span>Setting up account...</span>
                            </>
                          ) : (
                            <>
                              <span>Create Account</span>
                              <span className="material-symbols-outlined text-[20px]">person_add</span>
                            </>
                          )}
                        </button>
                      </form>

                      {/* Social Divider */}
                      <div className="relative my-space-md text-center">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full bg-surface-container-high h-[1px]" />
                        </div>
                        <span className="relative bg-surface-container px-3 text-secondary font-label-sm text-label-sm uppercase tracking-wider">
                          or
                        </span>
                      </div>

                      {/* Social Button */}
                      <button
                        type="button"
                        onClick={() => handleQuickFill('user')}
                        className="w-full py-3 px-4 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high border border-surface-container-high transition-colors duration-150 flex items-center justify-center gap-3 text-on-surface font-label-lg text-label-lg font-medium shadow-sm cursor-pointer"
                      >
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                        </svg>
                        <span>Continue with Google</span>
                      </button>

                      {/* Switch Tab Hint */}
                      <div className="mt-space-md text-center">
                        <p className="font-body-sm text-body-sm text-secondary">
                          Already have an account?
                          <button
                            type="button"
                            onClick={() => { setActiveTab('login'); setLoginStatus(null); }}
                            className="font-label-md text-label-md text-primary hover:text-on-surface transition-colors font-semibold ml-1 underline decoration-primary-container/40 underline-offset-4 cursor-pointer"
                          >
                            Log in
                          </button>
                        </p>
                      </div>
                    </div>
                  )}

                  {/* ======================= 3. EMAIL VERIFICATION VIEW ======================= */}
                  {activeTab === 'verify' && (
                    <div className="transition-all duration-300 py-2 text-center">
                      <div className="relative mb-space-md flex items-center justify-center">
                        <div className="absolute inset-0 rounded-full bg-primary-container/20 blur-md animate-pulse" />
                        <div className="relative w-20 h-20 rounded-full bg-surface-container-highest flex items-center justify-center shadow-inner">
                          <div className="w-14 h-14 rounded-full bg-surface-container flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary-container text-[32px]">
                              mark_email_read
                            </span>
                          </div>
                        </div>
                      </div>

                      <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary font-semibold mb-space-3xs block">
                        Authentication Step
                      </span>
                      <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-space-xs font-bold">
                        Check your email
                      </h2>
                      <p className="font-body-md text-body-md text-secondary max-w-sm mx-auto mb-space-md">
                        We've sent a verification link to your inbox. Click the link to confirm your account and unlock seamless parking.
                      </p>

                      {/* Destination Email Pill */}
                      <div className="w-full bg-surface-container-high rounded-lg p-space-xs mb-space-md flex items-center justify-between gap-space-2xs text-left border border-surface-container-highest">
                        <div className="flex items-center gap-space-2xs min-w-0">
                          <span className="material-symbols-outlined text-secondary text-[20px] shrink-0">
                            alternate_email
                          </span>
                          <div className="min-w-0">
                            <p className="font-label-sm text-label-sm text-secondary leading-none mb-1">Sent to</p>
                            <p className="font-label-lg text-label-lg text-on-surface font-medium truncate">
                              {registeredEmail}
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => setShowChangeEmailModal(true)}
                          className="shrink-0 font-label-md text-label-md text-primary hover:text-on-surface transition-colors px-space-2xs py-1 rounded bg-surface-container hover:bg-surface-container-highest cursor-pointer"
                        >
                          Change
                        </button>
                      </div>

                      {/* Toast Success Feedback */}
                      {toastSuccess && (
                        <div className="w-full mb-space-sm rounded-lg bg-surface-container-highest border border-emerald-500/40 p-space-xs text-left flex items-center gap-space-2xs animate-in fade-in">
                          <span className="material-symbols-outlined text-emerald-400 text-[20px]">check_circle</span>
                          <p className="font-body-sm text-body-sm text-on-surface">A fresh verification link has been dispatched to your inbox.</p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="w-full flex flex-col gap-space-xs mb-space-md">
                        <button
                          type="button"
                          disabled={resendCooldown > 0}
                          onClick={handleResendEmail}
                          className="w-full py-3 px-space-md rounded-lg font-headline-sm text-headline-sm bg-primary-container text-on-primary-container shadow-md hover:bg-primary hover:text-on-primary-fixed active:scale-[0.99] transition-all flex items-center justify-center gap-space-2xs disabled:opacity-50 cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[20px]">sync</span>
                          <span>{resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Email'}</span>
                        </button>

                        {/* Simulated Direct Activation */}
                        <button
                          type="button"
                          onClick={() => {
                            signIn('user@sanpark.ph', 'SanParkUser#2025');
                            navigate('/find-parking');
                          }}
                          className="w-full py-2.5 px-space-md rounded-lg font-label-lg text-label-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-md transition-colors flex items-center justify-center gap-space-2xs cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-[18px]">verified</span>
                          <span>Confirm &amp; Enter App</span>
                        </button>
                      </div>

                      <div className="flex items-center justify-center gap-space-3xs text-secondary font-label-md text-label-md">
                        <span>Wrong account?</span>
                        <button
                          type="button"
                          onClick={() => setActiveTab('login')}
                          className="text-on-surface font-semibold hover:text-primary transition-colors underline underline-offset-4 decoration-secondary/40 hover:decoration-primary cursor-pointer ml-1"
                        >
                          Back to Log In
                        </button>
                      </div>
                    </div>
                  )}

                </div>
              </div>

              {/* Security Indicator Pill */}
              <div className="mt-space-sm flex items-center justify-center gap-2 text-secondary font-label-sm text-label-sm">
                <span className="material-symbols-outlined text-[15px] text-primary">lock</span>
                <span>256-bit encrypted authentication • Obsidian Cloud</span>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-space-sm text-center text-secondary text-body-sm">
        <span>© 2025 SanPark Smart Parking Platform. All rights reserved.</span>
      </footer>

      {/* ======================= FORGOT PASSWORD MODAL ======================= */}
      {showForgotPasswordModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-surface-container-lowest/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="w-full max-w-md bg-surface-container border border-surface-container-high p-space-md sm:p-space-lg rounded-2xl shadow-2xl relative animate-in fade-in zoom-in-95">
            <button
              type="button"
              aria-label="Close modal"
              onClick={() => setShowForgotPasswordModal(false)}
              className="absolute top-4 right-4 text-secondary hover:text-on-surface p-1 rounded-full hover:bg-surface-container-high transition-colors cursor-pointer"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>

            <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-surface-container-high flex items-center justify-center text-primary-container mb-space-sm">
              <span className="material-symbols-outlined text-[26px]">key</span>
            </div>

            <h3 className="font-headline-lg text-headline-lg text-on-surface font-bold">Reset your password</h3>
            <p className="font-body-md text-body-md text-secondary mt-1 mb-space-md">
              Enter the email address tied to your SanPark account and we'll send a recovery link.
            </p>

            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <label className="block font-label-md text-label-md text-secondary" htmlFor="reset-email">
                  Email Address
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-secondary text-[20px] pointer-events-none">
                    mail
                  </span>
                  <input
                    id="reset-email"
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="driver@example.com"
                    className="w-full bg-surface-container-lowest text-on-surface placeholder:text-secondary-container pl-10 pr-3.5 py-3 rounded-lg font-body-md text-body-md border border-surface-container-high outline-none focus:border-primary-container transition-colors duration-150"
                  />
                </div>
              </div>

              {resetStatus && (
                <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 font-body-sm text-body-sm flex items-center gap-2">
                  <span className="material-symbols-outlined text-emerald-400 text-[18px]">check_circle</span>
                  <span>Reset link sent! Please check your spam folder if not received in 2 minutes.</span>
                </div>
              )}

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotPasswordModal(false)}
                  className="flex-1 py-3 px-4 rounded-xl bg-surface-container-high hover:bg-surface-bright text-on-surface font-label-lg text-label-lg transition-colors cursor-pointer border border-surface-container-highest"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmittingReset}
                  className="flex-1 py-3 px-4 rounded-xl bg-primary-container text-on-primary-container font-label-lg text-label-lg font-semibold hover:opacity-90 transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isSubmittingReset ? 'Sending...' : 'Send Link'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ======================= CHANGE EMAIL MODAL ======================= */}
      {showChangeEmailModal && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-surface-container-lowest/85 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="w-full max-w-sm bg-surface-container border border-surface-container-high rounded-xl p-space-lg shadow-xl relative animate-in fade-in zoom-in-95">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-1 font-bold">Update destination</h2>
            <p className="font-body-sm text-body-sm text-secondary mb-space-md">
              Enter your preferred email address to receive your activation link.
            </p>

            <form onSubmit={handleSaveNewEmail}>
              <div className="mb-space-md">
                <label className="block font-label-sm text-label-sm text-secondary mb-1" htmlFor="newEmailInput">
                  Email Address
                </label>
                <input
                  id="newEmailInput"
                  type="email"
                  required
                  value={newEmailInput}
                  onChange={(e) => setNewEmailInput(e.target.value)}
                  className="w-full bg-surface-container-lowest text-on-surface font-body-md text-body-md px-space-xs py-2.5 rounded-lg border border-surface-container-high outline-none focus:border-primary-container transition-colors"
                />
              </div>

              <div className="flex items-center justify-end gap-space-2xs">
                <button
                  type="button"
                  onClick={() => setShowChangeEmailModal(false)}
                  className="px-space-xs py-2 rounded-lg font-label-md text-label-md text-secondary hover:text-on-surface cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-space-md py-2 rounded-lg font-label-lg text-label-lg bg-primary-container text-on-primary-container hover:bg-primary hover:text-on-primary-fixed transition-colors cursor-pointer"
                >
                  Update &amp; Send
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
