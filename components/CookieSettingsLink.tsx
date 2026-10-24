"use client";

import { openConsent } from "./Consent";

export default function CookieSettingsLink() {
  return (
    <button type="button" className="link-arrow min-h-0 text-sm font-semibold" onClick={openConsent}>
      Cookie settings
    </button>
  );
}
