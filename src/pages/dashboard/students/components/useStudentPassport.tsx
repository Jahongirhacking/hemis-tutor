import {
  useGetStudentExtraInfoQuery,
  useGetStudentProfileQuery,
} from '@/services/api/statApi';
import { useGetStudentDetailsQuery } from '@/services/student';
import { IStudentExtraInfoRes } from '@/services/type';
import { Mail, MapPin, Phone } from 'lucide-react';
import moment from 'moment';
import { ReactNode, useMemo, useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

const PLACEHOLDER_AVATAR =
  'https://ui-avatars.com/api/?name=Talaba&background=1f2937&color=fff&rounded=true';

const MAX_ITEMS = 4;

type SummaryItem = {
  label: string;
  value: ReactNode;
};

type EducationPairRow = {
  leftLabel: string;
  leftValue: ReactNode;
  rightLabel: string;
  rightValue: ReactNode;
};

const useStudentPassport = ({ id }: { id: string }) => {
  const { data: studentDetails, isFetching: isStudentDetailsLoading } =
    useGetStudentDetailsQuery({ id: Number(id) }, { skip: !id });
  const studentId = useMemo(
    () => studentDetails?.result?.student?.student_id_number,
    [studentDetails]
  );
  const { data: studentData, isFetching: isPersonalLoading } =
    useGetStudentProfileQuery(
      { student_id_number: studentId },
      { skip: !studentId }
    );
  const student = useMemo(
    () => ({
      ...(studentData?.data || {}),
      __details: { ...(studentDetails?.result || {}) },
    }),
    [studentData]
  );

  const printRef = useRef<HTMLDivElement>(null);

  const handlePrint = useReactToPrint({
    contentRef: printRef,
    documentTitle: `Talaba_holati_${id ?? ''}`,
    pageStyle:
      '@page :first { size: A4; margin: 0; } @page { size: A4; margin-top: 10mm; margin-bottom: 0; margin-left: 0; margin-right: 0; } body { background: #e2e8f0; margin: 0; } .print-resume { width: 100%; min-height: calc(297mm - 16mm); margin: 0; padding: 4mm; box-sizing: border-box; } @media print { .resume-layout { width: 100%; box-shadow: none !important; border: none !important; } .education-card { break-inside: avoid !important; page-break-inside: avoid !important; } .education-cards-grid { display: grid !important; grid-template-columns: repeat(2, minmax(0, 1fr)) !important; gap: 1rem !important; } .registry-grid { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; } .registry-card { break-inside: avoid !important; page-break-inside: avoid !important; box-shadow: none !important; -webkit-print-color-adjust: exact !important; color-adjust: exact !important; print-color-adjust: exact !important; } .info-card { break-inside: avoid !important; page-break-inside: avoid !important; box-shadow: none !important; -webkit-print-color-adjust: exact !important; color-adjust: exact !important; print-color-adjust: exact !important; } section.grid.grid-cols-4 { grid-template-columns: repeat(4, minmax(0, 1fr)) !important; } }',
  });
  const { data: studentInfoData, isFetching: isStudentLoading } =
    useGetStudentExtraInfoQuery(
      { student_hash_number: student?.id },
      { skip: !student?.id }
    );
  const studentInfo = useMemo(() => studentInfoData?.data, [studentInfoData]);

  const position = studentInfo?.WORKPLACE?.positions?.[0];
  const hasEducationData = !!(student?.course || student?.gpas?.length);
  const hasWorkplaceData = !!studentInfo?.WORKPLACE?.positions?.length;
  const hasYouthData = !!studentInfo?.YOUTH_R?.length;

  const genderValue = `${student?.gender ?? ''}`.toLowerCase();
  const isFemaleStudent = ['ayol', 'female', 'жень', 'жен'].some(marker =>
    genderValue.startsWith(marker)
  );
  const hasWomenData = isFemaleStudent && !!studentInfo?.WOMEN_R?.length;
  const hasIronData = !!studentInfo?.IRON_R;
  const hasPovertyData = !!studentInfo?.POVERTY_R;
  const hasDisabilityData = !!studentInfo?.DISABILITY;
  const hasYattData = !!studentInfo?.YATT;
  const hasOrphanageData = !!(
    studentInfo?.ORPHANAGE?.Children &&
    studentInfo.ORPHANAGE.Children.length > 0
  );
  const hasSchoolCertificateData = !!studentInfo?.SCHOOL_CERTIFICATE;
  const hasScholarshipData = !!studentInfo?.SCHOLARSHIP?.stipendTypes?.length;
  const hasSelfData = !!studentInfo?.SELF_EMPLOYED;
  const hasRentData = !!(studentInfo?.RENT && studentInfo.RENT.length > 0);
  const hasContractData = !!studentInfo?.CONTRACT;
  const hasProfEmisData = !!studentInfo?.PROF_EMIS;
  const hasCreditModuleData = !!(
    studentInfo?.CREDIT_MODULE && studentInfo.CREDIT_MODULE.length > 0
  );
  const hasResidenceData = !!(
    studentInfo?.RESIDENCE && studentInfo.RESIDENCE.length > 0
  );
  const isLoading =
    isPersonalLoading || isStudentLoading || isStudentDetailsLoading;

  const avatarUrl = useMemo(
    () =>
      studentDetails?.result?.student?.image ||
      (student?.fullName
        ? `https://ui-avatars.com/api/?name=${encodeURIComponent(student?.fullName)}&background=1f2937&color=fff&rounded=true`
        : PLACEHOLDER_AVATAR),
    [student, studentData]
  );

  const educationSingles: SummaryItem[] = hasEducationData
    ? [
        { label: 'OTM', value: student?.universityName },
        { label: 'Mutaxassislik', value: student?.specialityName },
        { label: 'Fakultet', value: student?.facultyName },
        { label: "To'lov shakli", value: student?.paymentFormName },
      ]
    : [];

  const educationPairs: EducationPairRow[] = hasEducationData
    ? [
        {
          leftLabel: 'Ta’lim turi',
          leftValue: student?.eduType,
          rightLabel: "Ta'lim shakli",
          rightValue: student?.eduForm,
        },
        {
          leftLabel: 'Kurs',
          leftValue: student?.course,
          rightLabel: "Ta'lim tili",
          rightValue: student?.eduLanguageName,
        },
        {
          leftLabel: 'Qabul yili',
          leftValue: student?.enrollEducationYear,
          rightLabel: 'Holati',
          rightValue: student?.status,
        },
      ]
    : [];

  const workplaceSummary: SummaryItem[] =
    hasWorkplaceData && position
      ? limitItems([
          { label: 'Tashkilot', value: position.org },
          { label: 'Lavozim', value: position.position },
          { label: 'Stavka', value: position.rate },
        ])
      : [];

  const educationItems: SummaryItem[] = hasEducationData
    ? [
        ...educationSingles,
        ...educationPairs.flatMap(pair => [
          { label: pair.leftLabel, value: pair.leftValue },
          { label: pair.rightLabel, value: pair.rightValue },
        ]),
      ]
    : [];

  const registryBlocks = [
    {
      title: "Oliy ta'lim ma'lumotlari",
      items: hasEducationData ? educationItems : [],
    },
    {
      title: "O'rta ta'lim ma'lumotlari",
      items: hasSchoolCertificateData
        ? schoolCertificateSummary(studentInfo)
        : [],
    },
    {
      title: "Kasbiy Ta'lim Ma'lumotlari",
      items: hasProfEmisData ? limitItems(profEmisSummary(studentInfo)) : [],
    },
    {
      title: 'Ijtimoiy himoya',
      items: hasPovertyData ? limitItems(povertySummary(studentInfo)) : [],
    },
    {
      title: 'Vasiylik maʼlumotlari',
      items: hasOrphanageData ? limitItems(orphanageSummary(studentInfo)) : [],
    },
    {
      title: 'Stipendiya maʼlumotlari',
      items: hasScholarshipData
        ? limitItems(scholarshipSummary(studentInfo))
        : [],
    },
    {
      title: 'Yoshlar daftari',
      items: hasYouthData ? limitItems(youthSummary(studentInfo)) : [],
    },
    {
      title: 'Ayollar daftari',
      items: hasWomenData ? limitItems(womenSummary(studentInfo)) : [],
    },
    {
      title: 'Temir daftar',
      items: hasIronData ? limitItems(ironSummary(studentInfo)) : [],
    },
    {
      title: 'Nogironlik',
      items: hasDisabilityData
        ? limitItems(disabilitySummary(studentInfo))
        : [],
    },
    {
      title: 'YATT',
      items: hasYattData ? limitItems(yattSummary(studentInfo)) : [],
    },
    {
      title: "O'zini o'zi band qilganlik",
      items: hasSelfData ? limitItems(selfSummary(studentInfo)) : [],
    },
    {
      title: 'Ijara',
      items: hasRentData ? limitItems(rentSummary(studentInfo)) : [],
    },
    {
      title: 'Shartnoma maʼlumotlari',
      items: hasContractData ? limitItems(contractSummary(studentInfo)) : [],
    },
    { title: 'YMMT', items: workplaceSummary },
    {
      title: 'Kredit modul',
      items: hasCreditModuleData
        ? limitItems(creditModuleSummary(studentInfo))
        : [],
    },
    {
      title: 'Yotoqxona',
      items: hasResidenceData ? limitItems(residenceSummary(studentInfo)) : [],
    },
  ].sort((a, b) => (b.items.length > 0 ? 1 : 0) - (a.items.length > 0 ? 1 : 0));

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
    printRef,
    handlePrint,
    student,
    contactInfo,
    registryBlocks,
    isLoading,
    avatarUrl,
    studentInfo,
  };
};

export default useStudentPassport;

function limitItems(items: SummaryItem[], limit = MAX_ITEMS) {
  return items.slice(0, limit);
}

function youthSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const item = studentInfo?.YOUTH_R?.[0];
  return item
    ? [
        { label: 'Holati', value: item.status },
        { label: "Ro'yxatga olingan sana", value: item.entered_date },
        { label: "Yo'nalish:", value: item.direction_name },
      ]
    : [];
}

function womenSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const item = studentInfo?.WOMEN_R?.[0];
  return item
    ? [
        { label: 'Holati', value: item.status },
        { label: "Ro'yxatga olingan sana", value: item.entered_date },
        { label: "Yo'nalish:", value: ' ' + item.direction_name },
      ]
    : [];
}

function ironSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const item = studentInfo?.IRON_R;
  return item
    ? [
        { label: 'Holati', value: item.status.value },
        {
          label: "Ro'yxatga olingan sana",
          value: moment(item?.registrationDate).format('DD.MM.YYYY HH:mm'),
        },
        { label: "Oila a'zolari", value: item.members_count },
      ]
    : [];
}

function povertySummary(studentInfo: IStudentExtraInfoRes['data']) {
  const item = studentInfo?.POVERTY_R;
  return item
    ? [
        { label: 'Holati', value: item.action },
        { label: 'MFY INN', value: item.mfyInn },
        { label: 'Daraja', value: item.povertyLevelId },
      ]
    : [];
}

function disabilitySummary(studentInfo: IStudentExtraInfoRes['data']) {
  const item = studentInfo?.DISABILITY;
  return item
    ? [
        { label: 'Guruhi', value: item.disability_group },
        // { label: 'Foizi', value: item.disability_percentage },
        { label: 'Boshlanish', value: item.disability_date_start },
        { label: 'Sababi', value: item.disability_reason },
      ]
    : [];
}

function yattSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const item = studentInfo?.YATT;
  return item
    ? [
        { label: 'TIN', value: item.company.tin },
        { label: 'Holati', value: item.company.statusId },
        { label: 'Biznes turi', value: Number(item.company.businessType ?? 0) },
      ]
    : [];
}

function selfSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const item = studentInfo?.SELF_EMPLOYED;
  return item
    ? [
        { label: 'Faoliyat', value: item.activities[0].name },
        { label: 'Ro‘yxat raqami', value: item.registration_number },
        { label: 'Ro‘yxat sanasi', value: item.registration_date },
      ]
    : [];
}

function schoolCertificateSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const cert = studentInfo?.SCHOOL_CERTIFICATE;
  return cert
    ? [
        {
          label: 'Guvohnoma',
          value: cert.certSN ?? '-',
        },
        {
          label: 'Maktab',
          value: cert.school ?? '-',
        },
        {
          label: 'Sinfi',
          value: cert.classLevel ?? '-',
        },
        {
          label: 'Bitirgan yil',
          value: cert.gradYear ?? '-',
        },
        {
          label: 'Hudud',
          value: cert.region ?? '-',
        },
        {
          label: 'Tuman',
          value: cert.district ?? '-',
        },
        {
          label: 'Guvohnoma turi',
          value: cert.certTypeName ?? '-',
        },
        {
          label: "O'rtacha baho",
          value: cert.grades6YearsAvg ?? '-',
        },
      ]
    : [];
}

function profEmisSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const profEmis = studentInfo?.PROF_EMIS;
  return profEmis
    ? [
        {
          label: "Ta'lim muassasasi",
          value: profEmis.edu_name ?? '-',
        },
        {
          label: 'Hudud',
          value: profEmis.edu_region_name ?? '-',
        },
        {
          label: 'Tuman',
          value: profEmis.edu_district_name ?? '-',
        },
        {
          label: 'Kurs',
          value: profEmis.course ?? '-',
        },
        {
          label: 'Semestr',
          value: profEmis.semester ?? '-',
        },
        {
          label: 'Diplom',
          value: profEmis.is_have_diploma
            ? [profEmis.diploma_serial, profEmis.diploma_number]
                .filter(Boolean)
                .join(' ')
            : "Yo'q",
        },
        {
          label: "Ta'lim turi",
          value: profEmis.education_type_name ?? '-',
        },
        {
          label: 'Bitirgan yil',
          value: profEmis.graduated_year ?? '-',
        },
      ]
    : [];
}

function creditModuleSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const creditModule = studentInfo?.CREDIT_MODULE?.[0];
  return creditModule
    ? [
        {
          label: 'Kredit soni',
          value: creditModule.creditCount ?? '-',
        },
        {
          label: '1 kredit summasi',
          value: creditModule.oneCreditAmount
            ? `${creditModule.oneCreditAmount.toLocaleString('uz-UZ')} so'm`
            : '-',
        },
        {
          label: 'Jami summa',
          value: creditModule.amount
            ? `${creditModule.amount.toLocaleString('uz-UZ')} so'm`
            : '-',
        },
        {
          label: 'Fanlar',
          value: creditModule.subjects?.length
            ? creditModule.subjects.join(', ')
            : '-',
        },
      ]
    : [];
}

function residenceSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const residence = studentInfo?.RESIDENCE?.[0];
  return residence
    ? [
        {
          label: "O'quv muassasasi",
          value: residence.universityName ?? '-',
        },
        {
          label: 'Kurs',
          value: residence.course ?? '-',
        },
      ]
    : [];
}

function orphanageSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const orphanage = studentInfo?.ORPHANAGE;
  const count = orphanage?.Children?.length ?? 0;
  const pinflList =
    orphanage?.Children?.map(child => child.ChildPinfl).join(', ') ?? '-';
  const reasons =
    orphanage?.Children?.map(child => child.LessReason).join(', ') ?? '-';
  const types =
    orphanage?.Children?.map(child => child.GuardianshipType).join(', ') ?? '-';

  return [
    { label: 'Bolalar soni', value: count },
    { label: 'Bolalar PINFL', value: pinflList },
    { label: 'Sababi', value: reasons },
    { label: 'Vasiylik turi', value: types },
  ];
}

function scholarshipSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const stipend = studentInfo?.SCHOLARSHIP?.stipendTypes?.[0];
  return stipend
    ? [
        { label: 'Status', value: stipend.status ?? '-' },
        { label: 'Turi', value: stipend.stipendTypeId ?? '-' },
        {
          label: 'Umumiy to‘langan summa',
          value: stipend.totalCreditSum?.toLocaleString('uz-UZ')
            ? `${stipend.totalCreditSum.toLocaleString('uz-UZ')} so‘m`
            : '-',
        },
        {
          label: 'Davr',
          value: `${stipend.starOn} - ${stipend.endOn}`,
        },
      ]
    : [];
}

function rentSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const rentPayments = studentInfo?.RENT;
  if (!rentPayments || rentPayments.length === 0) {
    return [];
  }

  const totalAmount = rentPayments.reduce(
    (sum, payment) => sum + (payment.amount || 0),
    0
  );
  const firstPayment = rentPayments[0];
  const renterPinfl = firstPayment.renterPinfl || '-';
  const contractId = firstPayment.rentContractId || '-';

  return [
    {
      label: 'Jami to‘langan summa',
      value:
        totalAmount > 0 ? `${totalAmount.toLocaleString('uz-UZ')} so‘m` : '-',
    },
    {
      label: 'Ijaraga beruvchi PINFL',
      value: renterPinfl,
    },
    {
      label: 'Shartnoma raqami',
      value: contractId,
    },
  ];
}

function contractSummary(studentInfo: IStudentExtraInfoRes['data']) {
  const contract = studentInfo?.CONTRACT;
  if (!contract) {
    return [];
  }

  return [
    {
      label: 'Shartnoma raqami',
      value: contract.contractNumber || '-',
    },
    {
      label: 'Shartnoma summasi',
      value: contract.eduContractSum
        ? `${contract.eduContractSum.toLocaleString('uz-UZ')} so'm`
        : '-',
    },
    {
      label: 'Debit',
      value: contract.debit
        ? `${contract.debit.toLocaleString('uz-UZ')} so'm`
        : '-',
    },
    // {
    //   label: 'Credit',
    //   value: contract.credit ? `${contract.credit.toLocaleString('uz-UZ')} so'm` : '-'
    // }
  ];
}
