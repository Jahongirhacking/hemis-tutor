import DocumentCardSkeleton from '@/components/Skeletons/DocumentCardSkeleton';
import GenerateSkeleton from '@/components/Skeletons/GenerateSkeleton';
import NotFoundAnimation from '@/components/SpecialComponents/NotFoundAnimation';
import { useGetCertificateQuery } from '@/services/documents';
import { Card, Flex, Tag, Typography } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

const Certificates = () => {
  const { data: certificateData, isFetching } = useGetCertificateQuery();
  const { t } = useTranslation();

  if (!isFetching && (!certificateData || !certificateData?.data?.length))
    return (
      <NotFoundAnimation.Card
        description={`${t('const.certificates')} ${t('const.not_found')}`}
      />
    );

  if (isFetching)
    return (
      <GenerateSkeleton>
        <DocumentCardSkeleton downloadBtn={false} />
      </GenerateSkeleton>
    );

  return (
    <Flex gap={18} wrap>
      {certificateData?.data?.map(cert => (
        <Card key={cert?.id} className="document-card">
          <Flex vertical gap={16} justify="space-between">
            <Flex vertical gap={16}>
              <Flex align="center" wrap gap={12}>
                <Typography.Title
                  level={3}
                  style={{ margin: 0, fontSize: '24px' }}
                >
                  {cert?.certificateName?.name}
                </Typography.Title>
                {cert?.active ? (
                  <Tag color="success">{t('const.active')}</Tag>
                ) : (
                  <Tag color="error">{t('const.inactive')}</Tag>
                )}
              </Flex>
              <Flex vertical gap={12}>
                <Flex
                  justify="space-between"
                  align="center"
                  wrap
                  style={{ columnGap: '20px', rowGap: '5px' }}
                >
                  <Typography.Text style={{ color: 'rgba(0,0,0,0.65)' }}>
                    {'Sertifikat seriya raqami:'}
                  </Typography.Text>
                  <Typography.Text strong>{cert?.ser_number}</Typography.Text>
                </Flex>
                <Flex
                  justify="space-between"
                  align="center"
                  wrap
                  style={{ columnGap: '20px', rowGap: '5px' }}
                >
                  <Typography.Text style={{ color: 'rgba(0,0,0,0.65)' }}>
                    {'Fan:'}
                  </Typography.Text>
                  <Typography.Text strong>
                    {cert?.certificateSubject?.name}
                  </Typography.Text>
                </Flex>
                <Flex
                  justify="space-between"
                  align="center"
                  wrap
                  style={{ columnGap: '20px', rowGap: '5px' }}
                >
                  <Typography.Text style={{ color: 'rgba(0,0,0,0.65)' }}>
                    {'Sertifikat turi:'}
                  </Typography.Text>
                  <Typography.Text strong>
                    {cert?.certificateType?.name}
                  </Typography.Text>
                </Flex>
                <Flex
                  justify="space-between"
                  align="center"
                  wrap
                  style={{ columnGap: '20px', rowGap: '5px' }}
                >
                  <Typography.Text style={{ color: 'rgba(0,0,0,0.65)' }}>
                    {'Qayd etilgan sana:'}
                  </Typography.Text>
                  <Typography.Text strong>
                    {moment.unix(cert?.date_of_issue).format('DD.MM.YYYY')}
                  </Typography.Text>
                </Flex>
                <Flex
                  justify="space-between"
                  align="center"
                  wrap
                  style={{ columnGap: '20px', rowGap: '5px' }}
                >
                  <Typography.Text style={{ color: 'rgba(0,0,0,0.65)' }}>
                    {'Amal qilish sanasi:'}
                  </Typography.Text>
                  <Typography.Text strong>
                    {moment.unix(cert?.valid_until).format('DD.MM.YYYY')}
                  </Typography.Text>
                </Flex>
                <Flex
                  justify="space-between"
                  align="center"
                  wrap
                  style={{ columnGap: '20px', rowGap: '5px' }}
                >
                  <Typography.Text style={{ color: 'rgba(0,0,0,0.65)' }}>
                    {'Ball:'}
                  </Typography.Text>
                  <Typography.Text strong>
                    {cert?.certificateGrade?.name}
                  </Typography.Text>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Card>
      ))}
    </Flex>
  );
};

export default Certificates;
