import { useGetStudentPassportQuery } from '@/services/api/statApi';
import { Mail, MapPin, Phone } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PLACEHOLDER_AVATAR =
  'https://ui-avatars.com/api/?name=Talaba&background=1f2937&color=fff&rounded=true';

// const MAX_ITEMS = 4

// type SummaryItem = {
//   label: string
//   value: ReactNode
// }

// type EducationPairRow = {
//   leftLabel: string
//   leftValue: ReactNode
//   rightLabel: string
//   rightValue: ReactNode
// }

const useStudentPassport = ({ id }: { id: string }) => {
  const { data } = useGetStudentPassportQuery(
    { student_id_number: id },
    { skip: !id }
  );
  const student = useMemo(() => data?.data, [data]);
  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Talaba_holati_${id ?? ''}`,
    pageStyle:
      '@page :first { size: A4; margin: 0; } @page { size: A4; margin-top: 10mm; margin-bottom: 0; margin-left: 0; margin-right: 0; } body { background: #e2e8f0; margin: 0; } .print-resume { width: 100%; min-height: calc(297mm - 16mm); margin: 0; padding: 4mm; box-sizing: border-box; } @media print { .resume-layout { width: 100%; box-shadow: none !important; border: none !important; } .education-card { break-inside: avoid !important; page-break-inside: avoid !important; } .education-cards-grid { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1rem !important; } .registry-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } .registry-card { break-inside: avoid !important; page-break-inside: avoid !important; box-shadow: none !important; -webkit-print-color-adjust: exact !important; color-adjust: exact !important; print-color-adjust: exact !important; } .info-card { break-inside: avoid !important; page-break-inside: avoid !important; box-shadow: none !important; -webkit-print-color-adjust: exact !important; color-adjust: exact !important; print-color-adjust: exact !important; } section.grid.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; } }',
  });

  //   const position = studentInfo?.WORKPLACE?.positions?.[0]
  //   const hasEducationData = !!(student?.course || student?.gpas?.length)
  //   const hasWorkplaceData = !!studentInfo?.WORKPLACE?.positions?.length
  //   const hasYouthData = !!studentInfo?.YOUTH_R?.length

  const genderValue = `${student?.gender ?? ''}`.toLowerCase();
  const isFemaleStudent = ['ayol', 'female', 'жень', 'жен'].some(marker =>
    genderValue.startsWith(marker)
  );
  //   const hasWomenData = isFemaleStudent && !!studentInfo?.WOMEN_R?.length
  //   const hasIronData = !!studentInfo?.IRON_R
  //   const hasPovertyData = !!studentInfo?.POVERTY_R
  //   const hasDisabilityData = !!studentInfo?.DISABILITY
  //   const hasYattData = !!studentInfo?.YATT
  //   const hasOrphanageData = !!(
  //     studentInfo?.ORPHANAGE?.Children && studentInfo.ORPHANAGE.Children.length > 0
  //   )
  //   const hasSchoolCertificateData = !!studentInfo?.SCHOOL_CERTIFICATE
  //   const hasScholarshipData = !!studentInfo?.SCHOLARSHIP?.stipendTypes?.length
  //   const hasSelfData = !!studentInfo?.SELF_EMPLOYED
  //   const hasRentData = !!(studentInfo?.RENT && studentInfo.RENT.length > 0)
  //   const hasContractData = !!studentInfo?.CONTRACT
  //   const hasProfEmisData = !!studentInfo?.PROF_EMIS
  //   const hasCreditModuleData = !!(studentInfo?.CREDIT_MODULE && studentInfo.CREDIT_MODULE.length > 0)
  //   const hasResidenceData = !!(studentInfo?.RESIDENCE && studentInfo.RESIDENCE.length > 0)

  //   const isLoading = isPersonalLoading || isStudentLoading

  //   if (isLoading) {
  //     return (
  //       <div className="flex min-h-screen items-center justify-center">
  //         <Loader />
  //       </div>
  //     )
  //   }

  //   if (isPersonalError || isStudentError) {
  //     return <NotFoundPage />
  //   }

  //   const detailPath = `${paths.registrs.education.students}/${id}/info`

  const avatarUrl = student?.fullName
    ? `https://ui-avatars.com/api/?name=${encodeURIComponent(student.fullName)}&background=1f2937&color=fff&rounded=true`
    : PLACEHOLDER_AVATAR;

  //   const educationSingles: SummaryItem[] = hasEducationData
  //     ? [
  //         { label: 'OTM', value: student?.universityName },
  //         { label: 'Mutaxassislik', value: student?.specialityName },
  //         { label: 'Fakultet', value: student?.facultyName },
  //         { label: "To'lov shakli", value: student?.paymentFormName }
  //       ]
  //     : []

  //   const educationPairs: EducationPairRow[] = hasEducationData
  //     ? [
  //         {
  //           leftLabel: 'Ta’lim turi',
  //           leftValue: student?.eduType,
  //           rightLabel: "Ta'lim shakli",
  //           rightValue: student?.eduForm
  //         },
  //         {
  //           leftLabel: 'Kurs',
  //           leftValue: student?.course,
  //           rightLabel: "Ta'lim tili",
  //           rightValue: student?.eduLanguageName
  //         },
  //         {
  //           leftLabel: 'Qabul yili',
  //           leftValue: student?.enrollEducationYear,
  //           rightLabel: 'Holati',
  //           rightValue: student?.status
  //         }
  //       ]
  //     : []

  //   const workplaceSummary: SummaryItem[] =
  //     hasWorkplaceData && position
  //       ? limitItems([
  //           { label: 'Tashkilot', value: position.org },
  //           { label: 'Lavozim', value: position.position },
  //           { label: 'Stavka', value: position.rate }
  //         ])
  //       : []

  //   const registryBlocks = [
  //     {
  //       title: 'Ijtimoiy himoya',
  //       items: hasPovertyData ? limitItems(povertySummary(studentInfo)) : []
  //     },
  //     {
  //       title: 'Vasiylik maʼlumotlari',
  //       items: hasOrphanageData ? limitItems(orphanageSummary(studentInfo)) : []
  //     },
  //     {
  //       title: 'Stipendiya maʼlumotlari',
  //       items: hasScholarshipData ? limitItems(scholarshipSummary(studentInfo)) : []
  //     },
  //     { title: 'Yoshlar daftari', items: hasYouthData ? limitItems(youthSummary(studentInfo)) : [] },
  //     { title: 'Ayollar daftari', items: hasWomenData ? limitItems(womenSummary(studentInfo)) : [] },
  //     { title: 'Temir daftar', items: hasIronData ? limitItems(ironSummary(studentInfo)) : [] },
  //     {
  //       title: 'Nogironlik',
  //       items: hasDisabilityData ? limitItems(disabilitySummary(studentInfo)) : []
  //     },
  //     { title: 'YATT', items: hasYattData ? limitItems(yattSummary(studentInfo)) : [] },
  //     {
  //       title: "O'zini o'zi band qilganlik",
  //       items: hasSelfData ? limitItems(selfSummary(studentInfo)) : []
  //     },
  //     { title: 'Ijara', items: hasRentData ? limitItems(rentSummary(studentInfo)) : [] },
  //     {
  //       title: 'Shartnoma maʼlumotlari',
  //       items: hasContractData ? limitItems(contractSummary(studentInfo)) : []
  //     },
  //     { title: 'YMMT', items: workplaceSummary },
  //     {
  //       title: 'Kredit modul',
  //       items: hasCreditModuleData ? limitItems(creditModuleSummary(studentInfo)) : []
  //     },
  //     {
  //       title: 'Yotoqxona',
  //       items: hasResidenceData ? limitItems(residenceSummary(studentInfo)) : []
  //     }
  //   ].sort((a, b) => (b.items.length > 0 ? 1 : 0) - (a.items.length > 0 ? 1 : 0))

  const contactInfo = [
    {
      icon: <MapPin size={12} />,
      label: 'Manzil',
      value:
        [student?.region, student?.district, student?.address]
          .filter(Boolean)
          .join(', ') || "Ma'lumot yo'q",
    },
    {
      icon: <Phone size={12} />,
      label: 'Telefon',
      value: student?.phone || "Ma'lumot yo'q",
    },

    {
      icon: <Mail size={12} />,
      label: 'Email',
      value: student?.email || "Ma'lumot yo'q",
    },
  ];

  return {
    student,
    printRef,
    handlePrint,
    genderValue,
    isFemaleStudent,
    contactInfo,
    avatarUrl,
  };
};

export default useStudentPassport;
