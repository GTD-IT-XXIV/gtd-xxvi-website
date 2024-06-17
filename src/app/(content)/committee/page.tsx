import CommiteesContent from "./_components/commitees-content";
import CommiteesHeader from "./_components/commitees-header";

export default function CommitteePage() {
  return (
    <section>
      <div className="w-full flex justify-center">
        <div className="w-full">
          <CommiteesHeader />
          <CommiteesContent />
        </div>
      </div>
    </section>
  );
}
