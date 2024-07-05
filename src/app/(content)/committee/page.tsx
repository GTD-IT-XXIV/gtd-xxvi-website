import CommitteeContent from "./_components/committee-content";
import CommitteeHeader from "./_components/committee-header";

export default function CommitteePage() {
  return (
    <section>
      <div className="w-full flex justify-center">
        <div className="w-full">
          <CommitteeHeader />
          <CommitteeContent />
        </div>
      </div>
    </section>
  );
}
