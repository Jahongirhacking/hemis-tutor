import { convertIfCyrillic } from '@/utils/stringFunc';
import { Button } from 'antd';
import { Printer, User } from 'lucide-react';
import useStudentPassport from './useStudentPassport';

const StudentPassport = ({ props: id }: { props?: string }) => {
  const { printRef, student, handlePrint, contactInfo, avatarUrl } =
    useStudentPassport({ id });

  return (
    <div
      className="student-passport-page min-h-screen rounded-lg p-4"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-2 flex items-center justify-between gap-2 print:hidden">
          <div className="flex gap-2">
            <Button icon={<Printer size={16} />} onClick={handlePrint}>
              Chop etish
            </Button>
          </div>
        </div>

        <div className="flex justify-center">
          <div
            ref={printRef}
            className="print-resume resume-layout w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow"
            style={{ minHeight: 'calc(297mm - 16mm)' }}
          >
            {/* Vazirlik logotipi va nomi */}
            <div className="px-6 py-4">
              <div className="flex items-center justify-center gap-3">
                <img
                  alt="Vazirlik logotipi"
                  className="h-[30px] w-[30px] object-contain"
                  src="/ministry_logo_dark.png"
                />
                <div>
                  <h2 className="text-[14px] leading-[16px] font-medium text-black">
                    {' '}
                    OLIY TA'LIM, FAN VA
                  </h2>
                  <h2 className="text-[14px] leading-[16px] font-medium text-black">
                    INNOVATSIYALAR VAZIRLIGI
                  </h2>
                </div>
              </div>
            </div>

            <div className="px-6">
              <h1 className="letter-spacing-[-2%] text-center text-[18px] leading-[100%] font-bold text-black uppercase">
                TALABANING RAQAMLI PASPORTI
              </h1>
            </div>

            <div className="px-6 py-4">
              {/* Talaba ma'lumotlari - Bitta katta card */}
              <div
                className="info-card mb-6 rounded-[5px] border bg-[#F9F9FA] shadow-sm"
                style={{ borderColor: '#B0C0D0', borderWidth: '1px' }}
              >
                {/* Card Header - Rasm, Ism, DTM bali */}
                <div className="border-b border-[#E0E7F5] bg-[#F9F9FA] px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <img
                        src={avatarUrl}
                        alt={student?.fullName ?? 'Talaba'}
                        className="h-[50px] w-[50px] rounded-full border-2 border-slate-300 shadow-sm"
                      />
                      <div>
                        <h2 className="text-[14px] leading-[16px] font-medium text-black">
                          {convertIfCyrillic(student?.fullName) ||
                            'Talaba nomi'}
                        </h2>
                        {student?.specialityName && (
                          <p className="mt-1 text-sm text-slate-600">
                            Sport faoliyati:{' '}
                            {convertIfCyrillic(student.specialityName)}
                          </p>
                        )}
                      </div>
                    </div>
                    {/* {studentInfo?.DTM?.score !== undefined && (
                      <div className="text-right">
                        <p className="bg-gradient-to-b from-[#0036FF] to-[#4E74FF] bg-clip-text text-2xl font-medium text-transparent">
                          {studentInfo.DTM.score}
                        </p>
                        <p className="text-sm font-medium text-slate-600">Umumiy DTM bal</p>
                      </div>
                    )} */}
                  </div>
                </div>

                {/* Card Body - Talaba ma'lumotlari va Kontakt ma'lumotlari */}
                <div className="flex gap-10 p-6">
                  {/* Talaba ma'lumotlari */}
                  <div>
                    {/* Talaba ma'lumotlari Button */}
                    <div className="mb-3 inline-flex w-max items-center gap-3 rounded-lg border border-slate-200 bg-white py-[4px] pr-4 pl-[4px] shadow-sm">
                      <div
                        className="flex h-[35px] w-[35px] items-center justify-center rounded-[4px]"
                        style={{
                          background:
                            'linear-gradient(to top, #DEEDFA, #FFFFFF)',
                        }}
                      >
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-semibold text-black">
                        Talaba ma'lumotlari
                      </span>
                    </div>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2">
                        <span className="text-sm font-bold text-black">
                          Talaba ID
                        </span>
                        <span className="text-sm text-slate-900">
                          {convertIfCyrillic(student?.code)}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-sm font-bold text-black">
                          JSHSHIR
                        </span>
                        <span className="text-sm text-slate-900">
                          {convertIfCyrillic(student?.pinfl)}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-sm font-bold text-black">
                          Pasport
                        </span>
                        <span className="text-sm text-slate-900">
                          {convertIfCyrillic(student?.serialAndNumber)}
                        </span>
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-sm font-bold text-black">
                          Jinsi
                        </span>
                        <span className="text-sm text-slate-900">
                          {convertIfCyrillic(student?.gender)}
                        </span>
                      </li>
                    </ul>
                  </div>

                  {/* Kontakt ma'lumotlari */}
                  <div>
                    {/* Kontakt ma'lumotlari Button */}
                    <div className="mb-3 inline-flex w-max items-center gap-3 rounded-lg border border-slate-200 bg-white py-[4px] pr-4 pl-[4px] shadow-sm">
                      <div
                        className="flex h-[35px] w-[35px] items-center justify-center rounded-[4px]"
                        style={{
                          background:
                            'linear-gradient(to top, #DEEDFA, #FFFFFF)',
                        }}
                      >
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <span className="text-sm font-semibold text-black">
                        Kontakt ma'lumotlari
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {contactInfo.map(item => (
                        <li
                          key={item.label}
                          className="flex items-center gap-2"
                        >
                          <span className="text-slate-400">{item.icon}</span>
                          <span className="text-sm font-bold text-black">
                            {item.label}
                          </span>
                          <span className="overflow-wrap-anywhere flex-1 text-sm break-words text-slate-900">
                            {convertIfCyrillic(item.value)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Ta'lim ma'lumotlari - Alohida kartalar */}
              <div className="education-cards-grid mb-6 grid gap-4 md:grid-cols-2">
                {/* Oliy Ta'lim ma'lumotlari */}
                {/* {hasEducationData && (
                  <div className="education-card overflow-hidden rounded-lg border bg-white shadow-sm" style={{ borderColor: '#B0C0D0', borderWidth: '1px' }}>
                    <h3
                      className="border-b border-slate-200 px-4 pb-2 pt-4 text-xs font-semibold tracking-widest uppercase"
                      style={{ color: '#0137FF' }}
                    >
                      Oliy ta'lim ma'lumotlari
                    </h3>
                    <ul className="text-slate-700">
                      {[...educationSingles, ...educationPairs.flatMap((pair) => [
                        { label: pair.leftLabel, value: pair.leftValue },
                        { label: pair.rightLabel, value: pair.rightValue }
                      ])].map((item, index, array) => (
                        <li
                          key={`${item.label}-${index}`}
                          className={`flex items-start justify-between gap-2 px-4 ${index === array.length - 1 ? 'pb-4 pt-1.5' : 'py-1.5'
                            }`}
                          style={{
                            backgroundColor: index % 2 === 0 ? 'rgba(3, 49, 220, 0.05)' : 'white',
                            WebkitPrintColorAdjust: 'exact',
                            printColorAdjust: 'exact',
                            colorAdjust: 'exact'
                          }}
                        >
                          <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                          <span className="flex-1 overflow-hidden text-right text-sm text-slate-900">
                            {typeof item.value === 'string' || typeof item.value === 'number' || item.value === null || item.value === undefined
                              ? convertIfCyrillic(item.value)
                              : item.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}

                {/* O'rta ta'lim ma'lumotlari */}
                {/* {hasSchoolCertificateData && (
                  <div className="education-card overflow-hidden rounded-lg border bg-white shadow-sm" style={{ borderColor: '#B0C0D0', borderWidth: '1px' }}>
                    <h3
                      className="border-b border-slate-200 px-4 pb-2 pt-4 text-xs font-semibold tracking-widest uppercase"
                      style={{ color: '#0137FF' }}
                    >
                      O'rta ta'lim ma'lumotlari
                    </h3>
                    <ul className="text-slate-700">
                      {schoolCertificateSummary(studentInfo).map((item, index, array) => (
                        <li
                          key={item.label}
                          className={`flex items-start justify-between gap-2 px-4 ${index === array.length - 1 ? 'pb-4 pt-1.5' : 'py-1.5'
                            }`}
                          style={{
                            backgroundColor: index % 2 === 0 ? 'rgba(3, 49, 220, 0.05)' : 'white',
                            WebkitPrintColorAdjust: 'exact',
                            printColorAdjust: 'exact',
                            colorAdjust: 'exact'
                          }}
                        >
                          <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                          <span className="flex-1 overflow-hidden text-right text-sm text-slate-900">
                            {typeof item.value === 'string' || typeof item.value === 'number' || item.value === null || item.value === undefined
                              ? convertIfCyrillic(item.value)
                              : item.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}

                {/* Kasbiy Ta'lim Ma'lumotlari */}
                {/* {hasProfEmisData && (
                  <div className="education-card overflow-hidden rounded-lg border bg-white shadow-sm" style={{ borderColor: '#B0C0D0', borderWidth: '1px' }}>
                    <h3
                      className="border-b border-slate-200 px-4 pb-2 pt-4 text-xs font-semibold tracking-widest uppercase"
                      style={{ color: '#0137FF' }}
                    >
                      Kasbiy Ta'lim Ma'lumotlari
                    </h3>
                    <ul className="text-slate-700">
                      {profEmisSummary(studentInfo).map((item, index, array) => (
                        <li
                          key={item.label}
                          className={`flex items-start justify-between gap-2 px-4 ${index === array.length - 1 ? 'pb-4 pt-1.5' : 'py-1.5'
                            }`}
                          style={{
                            backgroundColor: index % 2 === 0 ? 'rgba(3, 49, 220, 0.05)' : 'white',
                            WebkitPrintColorAdjust: 'exact',
                            printColorAdjust: 'exact',
                            colorAdjust: 'exact'
                          }}
                        >
                          <span className="text-sm font-semibold text-slate-700">{item.label}</span>
                          <span className="flex-1 overflow-hidden text-right text-sm text-slate-900">
                            {typeof item.value === 'string' || typeof item.value === 'number' || item.value === null || item.value === undefined
                              ? convertIfCyrillic(item.value)
                              : item.value}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )} */}
              </div>

              {/* Registry Cards Grid - Ma'lumoti bo'lgan cardlar */}
              {/* <section className="registry-grid mb-4 grid gap-4 md:grid-cols-2">
                {registryBlocks
                  .filter((block) => block.items.length > 0)
                  .map((block) => (
                    <div
                      key={block.title}
                      className="registry-card overflow-hidden rounded-lg border bg-white shadow-sm transition-colors"
                      style={{ borderColor: '#B0C0D0', borderWidth: '1px' }}
                    >
                      <h3
                        className="border-b border-slate-200 px-4 pb-2 pt-4 text-xs font-semibold tracking-widest uppercase"
                        style={{ color: '#0137FF' }}
                      >
                        {block.title}
                      </h3>
                      <ul className="text-slate-700">
                        {block.items.map((item, index) => (
                          <li
                            key={item.label}
                            className={`flex items-start justify-between gap-2 px-4 ${index === block.items.length - 1 ? 'pb-4 pt-1.5' : 'py-1.5'
                              }`}
                            style={{
                              backgroundColor: index % 2 === 0 ? 'rgba(3, 49, 220, 0.05)' : 'white',
                              WebkitPrintColorAdjust: 'exact',
                              printColorAdjust: 'exact',
                              colorAdjust: 'exact'
                            }}
                          >
                            <span className="text-sm font-semibold text-slate-700">
                              {item.label}
                            </span>
                            <span className="flex-1 overflow-hidden text-right text-sm text-slate-900">
                              {typeof item.value === 'string' || typeof item.value === 'number' || item.value === null || item.value === undefined
                                ? convertIfCyrillic(item.value)
                                : item.value}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </section> */}

              {/* Ma'lumoti kelmagan cardlar - 4 ta ustunli grid */}
              {/* {registryBlocks.filter((block) => block.items.length === 0).length > 0 && (
                <section className="grid grid-cols-4 items-stretch gap-4">
                  {registryBlocks
                    .filter((block) => block.items.length === 0)
                    .map((block) => (
                      <div
                        key={block.title}
                        className="registry-card flex h-full items-center justify-center rounded-lg border border-dashed p-4 shadow-sm transition-colors"
                        style={{
                          backgroundColor: '#FFE7E7',
                          borderColor: '#C63033',
                          borderWidth: '1px',
                          WebkitPrintColorAdjust: 'exact',
                          printColorAdjust: 'exact',
                          colorAdjust: 'exact'
                        }}
                      >
                        <h3
                          className="mb-0 text-center text-xs font-semibold tracking-widest uppercase"
                          style={{ color: '#dc2626' }}
                        >
                          {block.title}
                        </h3>
                      </div>
                    ))}
                </section>
              )} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentPassport;
