const handleFinish = async () => {
  setError("");
  setSaving(true);

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) throw userError;

    if (!user) {
      navigate("/auth");
      return;
    }

    const profile = {
      id: user.id,
      full_name:
        user.user_metadata?.full_name ||
        user.email?.split("@")[0] ||
        "Student",
      email: user.email,
      university,
      department,
      year,
    };

    const { error: profileError } = await supabase
      .from("profiles")
      .upsert(profile);

    if (profileError) {
      console.error("PROFILE ERROR:", profileError);
      throw profileError;
    }

    localStorage.setItem(
      "unimate_profile",
      JSON.stringify(profile)
    );

    navigate("/dashboard", { replace: true });

  } catch (err) {
    console.error("ONBOARDING ERROR:", err);

    setError(
      err?.message ||
      "Unable to save your profile. Please try again."
    );
  } finally {
    setSaving(false);
  }
};