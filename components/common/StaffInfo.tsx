import { Separator } from "@/components/ui/separator";
import { CastMember, CreditsData } from "@/lib/types";

interface StaffInfoProps {
  job?: string;
  role: string;
  castdata: CreditsData;
  type?: "crew" | "cast";
}

const StaffInfo = ({ job, role, castdata, type = "crew" }: StaffInfoProps) => {
  let staff: CastMember[] | undefined;

  if (type === "cast") {
    staff = castdata?.cast?.slice(0, 3);
  } else {
    staff = castdata?.crew?.filter((person: CastMember) => person.job === job);
  }

  return (
    <div className="w-full">
      <div className="flex text-[#09090B] dark:text-white gap-[53px] text-base pb-1">
        <h3 className="font-bold">{role}</h3>
        <p className="font-normal text-gray-600 dark:text-gray-300">
          {staff?.map((person: CastMember, index: number) => (
            <span key={person.id || index}>
              {person.name}
              {index < (staff?.length || 0) - 1 && " · "}
            </span>
          ))}
        </p>
      </div>
      <Separator />
    </div>
  );
};

export default StaffInfo;
