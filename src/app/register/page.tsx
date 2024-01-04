import BundlePopup from "@/components/bundle-popup";
import EscapeRoomBundlePopupContent from "@/components/gtdfest/escaperoom-bundle-popup-content";
import GTDFestBundlePopupContent from "@/components/gtdfest/gtdfest-bundle-popup-content";
import RegistrationForm from "@/components/registration-form";

export default function Register() {
  return (
    <main>
      <h1 className="text-2xl font-semibold">Registration Page</h1>
      <BundlePopup>
        <GTDFestBundlePopupContent />
        <EscapeRoomBundlePopupContent />
      </BundlePopup>
      <RegistrationForm />
    </main>
  );
}
