import DownloadAuthButton from '@/components/FileList/DownloadAuthButton';
import DocumentCardSkeleton from '@/components/Skeletons/DocumentCardSkeleton';
import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import { useGetDocumentMutation } from '@/services/documents';
import { Card, Empty, Flex, Typography } from 'antd';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const StudentDocument = () => {
  const [getDocument, { data: studentDocuments, isLoading }] =
    useGetDocumentMutation();
  const { t } = useTranslation();

  useEffect(() => {
    getDocument();
  }, [getDocument]);

  return (
    <Flex
      className="student-document--wrapper"
      wrap
      gap={24}
      justify="flex-start"
    >
      {studentDocuments?.data?.length > 0 ? (
        [...studentDocuments?.data]
          ?.sort((a, b) => b?.id - a?.id)
          ?.map((studentDocument, index) => (
            <Card key={index} className="document-card">
              <Flex vertical gap={16} justify="space-between">
                <Flex vertical gap={16}>
                  <Typography.Title
                    level={3}
                    style={{ margin: 0, fontSize: '24px' }}
                  >
                    {studentDocument?.name}
                  </Typography.Title>
                  <Flex vertical gap={12}>
                    {Object.keys(studentDocument?.attributes)?.length > 0 &&
                      studentDocument?.attributes?.map((detail, index) => (
                        <Flex
                          key={index}
                          justify="space-between"
                          align="center"
                          wrap
                          style={{ columnGap: '20px', rowGap: '5px' }}
                        >
                          <Typography.Text
                            style={{ color: 'rgba(0,0,0,0.65)' }}
                          >
                            {detail.label}
                          </Typography.Text>
                          <Typography.Text strong>
                            {detail.value}
                          </Typography.Text>
                        </Flex>
                      ))}
                  </Flex>
                </Flex>
                <DownloadAuthButton
                  type="primary"
                  href={studentDocument?.file}
                  filename={`${studentDocument?.name}.pdf`}
                  style={{ margin: '0 0 0 auto' }}
                >
                  {t('const.download')}
                </DownloadAuthButton>
              </Flex>
            </Card>
          ))
      ) : isLoading ? (
        <GenerateSkeleton>
          <DocumentCardSkeleton />
        </GenerateSkeleton>
      ) : (
        <Empty
          description={`${t('const.document')} ${t('const.not_found')}`}
          style={{ margin: ' 20px auto 0 auto' }}
        />
      )}
    </Flex>
  );
};

export default StudentDocument;
