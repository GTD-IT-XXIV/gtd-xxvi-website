import CommiteesContent from "./_components/commitees-content";
import CommiteesHeader from "./_components/commitees-header";

export default function CommitteePage() {
  return (
    <h1>
      <div className="w-full flex justify-center">
        <div className="w-1/4">
          <CommiteesHeader />
          <CommiteesContent />
        </div>
      </div>
    </h1>
  );
}
