import { convertIfCyrillic } from '@/utils/stringFunc';
import { Button, Card, Flex, Image, Skeleton } from 'antd';
import { Printer, User } from 'lucide-react';
import useStudentPassport from './useStudentPassport';

const DEFAULT_IMAGE = '/images/avatar-male.jpg';

const StudentPassport = ({ props: id }: { props?: string }) => {
  const {
    printRef,
    handlePrint,
    student,
    contactInfo,
    registryBlocks,
    studentInfo,
    avatarUrl,
    isLoading,
  } = useStudentPassport({ id });

  return (
    <div
      className="student-passport-page min-h-screen rounded-lg"
      style={{ backgroundColor: 'var(--bg-secondary)' }}
    >
      <Flex vertical gap={10} className="mx-auto max-w-6xl">
        <div className="flex justify-center">
          <Flex
            vertical
            gap={12}
            ref={printRef}
            className="print-resume resume-layout w-full overflow-hidden rounded-lg border border-slate-200 bg-white shadow"
            style={{ minHeight: 'calc(297mm - 16mm)', width: '100%' }}
            align="center"
          >
            <div className="px-6">
              <h1 className="letter-spacing-[-2%] text-center text-[24px] leading-[100%] mt-4 font-bold text-black uppercase">
                TALABANING RAQAMLI PASPORTI
              </h1>
            </div>

            <div className="px-6 py-4 w-full">
              {/* Talaba ma'lumotlari - Bitta katta card */}
              {isLoading ? (
                <Card className="mb-4">
                  <Flex vertical gap={18}>
                    <Flex gap={12} align="center">
                      <Skeleton.Image active className="!w-[60px] !h-[60px]" />
                    </Flex>
                    <Skeleton active />
                  </Flex>
                </Card>
              ) : (
                <>
                  <div
                    className="info-card mb-6 rounded-[5px] border bg-[#F9F9FA] shadow-sm"
                    style={{ borderColor: '#B0C0D0', borderWidth: '1px' }}
                  >
                    {/* Card Header - Rasm, Ism, DTM bali */}
                    <div className="border-b border-[#E0E7F5] bg-[#F9F9FA] px-6 py-4">
                      <div className="flex items-center justify-between flex-wrap">
                        <div className="flex items-center gap-4 flex-wrap">
                          <Image
                            src={avatarUrl}
                            alt={
                              student?.__details?.student?.full_name ?? 'Talaba'
                            }
                            className="border-slate-300 shadow-sm min-w-[40px]"
                            fallback={DEFAULT_IMAGE}
                            preview={false}
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: '50%',
                            }}
                          />
                          <div>
                            <h2 className="text-[14px] leading-[16px] font-medium text-black">
                              {convertIfCyrillic(
                                student?.__details?.student?.full_name ||
                                  student?.fullName
                              ) || 'Talaba'}
                            </h2>
                            {(student?.__details?.meta?.specialty?.name ||
                              student?.specialityName) && (
                              <p className="mt-1 text-sm text-slate-600">
                                Mutaxassislik:{' '}
                                {convertIfCyrillic(
                                  student?.__details?.meta?.specialty?.name ||
                                    student?.specialityName
                                )}
                              </p>
                            )}
                          </div>
                        </div>
                        {studentInfo?.DTM?.score !== undefined && (
                          <div className="text-right">
                            <p className="bg-gradient-to-b from-[#0036FF] to-[#4E74FF] bg-clip-text text-2xl font-medium text-transparent">
                              {studentInfo?.DTM?.score}
                            </p>
                            <p className="text-sm font-medium text-slate-600">
                              Umumiy DTM ball
                            </p>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Card Body - Talaba ma'lumotlari va Kontakt ma'lumotlari */}
                    <div className="flex gap-10 p-6 [@media(max-width:600px)]:flex-wrap">
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
                              {convertIfCyrillic(
                                student?.__details?.student
                                  ?.student_id_number || student?.code
                              )}
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-sm font-bold text-black">
                              JSHSHIR
                            </span>
                            <span className="text-sm text-slate-900">
                              {convertIfCyrillic(
                                student?.__details?.student?.passport_pin ||
                                  student?.pinfl
                              )}
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-sm font-bold text-black">
                              Pasport
                            </span>
                            <span className="text-sm text-slate-900">
                              {convertIfCyrillic(
                                student?.__details?.student?.passport_number ||
                                  student?.serialAndNumber
                              )}
                            </span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="text-sm font-bold text-black">
                              Jinsi
                            </span>
                            <span className="text-sm text-slate-900">
                              {convertIfCyrillic(
                                student?.__details?.student?.gender?.name ||
                                  student?.gender
                              )}
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
                          {contactInfo?.map(item => (
                            <li
                              key={item.label}
                              className="flex items-center gap-2"
                            >
                              <span className="text-slate-400">
                                {item.icon}
                              </span>
                              <span className="text-sm font-bold text-black">
                                {item.label}:
                              </span>
                              <span className="overflow-wrap-anywhere flex-1 text-sm break-words text-slate-900">
                                {typeof item?.value === 'string'
                                  ? convertIfCyrillic(item?.value)
                                  : item?.value}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Registry Cards Grid - 2 ustunli layout */}
              {isLoading ? (
                <Card className="mb-[30px]">
                  <Skeleton active />
                </Card>
              ) : (
                <section className="registry-grid mb-4 grid gap-4 md:grid-cols-2">
                  {registryBlocks
                    .filter(block => block.items.length > 0)
                    .map(block => (
                      <div
                        key={block.title}
                        className="registry-card overflow-hidden rounded-lg border bg-white shadow-sm transition-colors"
                        style={{ borderColor: '#B0C0D0', borderWidth: '1px' }}
                      >
                        <h3
                          className="border-b border-slate-200 px-4 pt-4 pb-2 text-xs font-semibold tracking-widest uppercase"
                          style={{ color: '#0137FF' }}
                        >
                          {block.title}
                        </h3>
                        <ul className="text-slate-700">
                          {block.items &&
                            block.items.map((item, index) => (
                              <li
                                key={item.label}
                                className={`flex items-start justify-between gap-2 px-4 ${
                                  index === block.items.length - 1
                                    ? 'pt-1.5 pb-4'
                                    : 'py-1.5'
                                }`}
                                style={{
                                  backgroundColor:
                                    index % 2 === 0
                                      ? 'rgba(3, 49, 220, 0.05)'
                                      : 'white',
                                  WebkitPrintColorAdjust: 'exact',
                                  printColorAdjust: 'exact',
                                  colorAdjust: 'exact',
                                }}
                              >
                                <span className="text-sm font-semibold text-slate-700">
                                  {item.label}
                                </span>
                                <span className="flex-1 overflow-hidden text-right text-sm text-slate-900">
                                  {typeof item.value === 'string' ||
                                  typeof item.value === 'number' ||
                                  item.value === null ||
                                  item.value === undefined
                                    ? convertIfCyrillic(item.value)
                                    : item.value}
                                </span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    ))}
                </section>
              )}

              {/* Ma'lumoti kelmagan cardlar - 4 ta ustunli grid */}
              {registryBlocks?.filter(block => block.items.length === 0)
                .length > 0 && (
                <section className="grid grid-cols-2 items-stretch gap-4 md:!grid-cols-4">
                  {registryBlocks
                    .filter(block => block.items.length === 0)
                    .map(block => (
                      <div
                        key={block.title}
                        className="registry-card flex h-full items-center justify-center rounded-lg border border-dashed p-1 shadow-sm transition-colors"
                        style={{
                          backgroundColor: '#FFE7E7',
                          borderColor: '#C63033',
                          borderWidth: '1px',
                          WebkitPrintColorAdjust: 'exact',
                          printColorAdjust: 'exact',
                          colorAdjust: 'exact',
                        }}
                      >
                        <h3
                          className="mb-0 text-center text-xs font-semibold tracking-widest uppercase"
                          style={{ color: '#dc2626', fontSize: 10 }}
                        >
                          {block.title}
                        </h3>
                      </div>
                    ))}
                </section>
              )}
            </div>
          </Flex>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2 print:hidden">
          <Flex justify="flex-end" className="flex gap-2 w-full">
            <Button
              type="primary"
              icon={<Printer size={16} />}
              onClick={handlePrint}
              style={{ marginLeft: 'auto' }}
            >
              Chop etish
            </Button>
          </Flex>
        </div>
      </Flex>
    </div>
  );
};

export default StudentPassport;
