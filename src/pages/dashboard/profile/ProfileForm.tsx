// import { ControlledFlowContext } from '@/components/ControlledFlow';
// import {
//   FormattedPassportNumberInput,
//   FormattedPhoneNumberInput,
// } from '@/components/Form/customInputs';
// import { useAppSelector } from '@/store/hooks';
// import { toFirstCapitalLetter } from '@/utils/stringFunc';
// import {
//   Avatar,
//   Card,
//   Flex,
//   Form,
//   Input,
//   message,
//   Switch,
//   Typography,
//   Upload,
// } from 'antd';
// import { UploadChangeParam } from 'antd/es/upload/interface';
// import { useContext, useState } from 'react';
// import { useTranslation } from 'react-i18next';

// interface IProfileForm extends IProfile {
//   password: string;
//   repeatedPassword: string;
// }

// const ProfileForm = () => {
//   const user = useAppSelector(state => state.authSlice.profile);
//   const [isPasswordEnabled, setIsPasswordEnabled] = useState<boolean>(false);
//   const { form } = useContext(ControlledFlowContext);
//   const { t } = useTranslation();

//   const [imageUrl, setImageUrl] = useState<string>(user?.data?.image);

//   const handlePasswordSwitchChange = (checked: boolean) => {
//     setIsPasswordEnabled(checked);
//     if (!checked) {
//       form.resetFields(['password', 'repeatedPassword']);
//     }
//   };

//   const handleUpload = (info: UploadChangeParam) => {
//     if (info.file.status === 'done') {
//       const newImageUrl = URL.createObjectURL(info.file.originFileObj);
//       setImageUrl(newImageUrl);
//       message.success("Profil rasmi muvaffaqiyatli o'zgartirildi!");
//     } else if (info.file.status === 'error') {
//       message.error('Profil rasmini yangilashda xatolik!');
//     }
//   };

//   return (
//     <Form
//       name="profile-form"
//       autoComplete="off"
//       form={form}
//       initialValues={{
//         firstname: user?.data?.first_name,
//         lastname: user?.data?.second_name,
//         login: user?.data?.student_id_number,
//         passportNumber: user?.data?.passport_number,
//         email: user?.data?.email,
//         phoneNumber: user?.data?.phone,
//         password: '',
//         repeatedPassword: '',
//       }}
//     >
//       <Flex gap={24} className="profile__form-wrapper" wrap align="flex-start">
//         <Card>
//           <Typography.Title level={4}>
//             {t('dashboard.settings.profile.personal_info_text')}
//           </Typography.Title>

//           <Flex gap={24} wrap>
//             <Upload
//               disabled
//               name="avatar"
//               showUploadList={false}
//               action="/upload" // Replace with your upload URL
//               onChange={handleUpload}
//             >
//               <Avatar
//                 src={imageUrl}
//                 alt="profile-img"
//                 size={64}
//                 style={{ cursor: 'pointer' }}
//               />
//             </Upload>

//             <Flex vertical gap={16} flex={1} style={{ minWidth: '150px' }}>
//               <Form.Item<IProfileForm>
//                 label={t('const.firstname')}
//                 name="firstname"
//               >
//                 <Input disabled placeholder={t('const.firstname')} />
//               </Form.Item>

//               <Form.Item<IProfileForm>
//                 label={t('const.lastname')}
//                 name="lastname"
//               >
//                 <Input disabled placeholder={t('const.lastname')} />
//               </Form.Item>

//               <Form.Item<IProfileForm> label={t('const.login')} name="login">
//                 <Input
//                   disabled
//                   placeholder={t('const.login')}
//                   autoComplete="username"
//                 />
//               </Form.Item>

//               <Form.Item<IProfileForm>
//                 label={t('const.passport_number')}
//                 name="passportNumber"
//               >
//                 <FormattedPassportNumberInput props={{ disabled: true }} />
//               </Form.Item>
//             </Flex>
//           </Flex>
//         </Card>

//         <Card>
//           <Typography.Title level={4}>
//             {t('const.for_communication')}
//           </Typography.Title>

//           <Flex vertical gap={16} flex={1} style={{ minWidth: '150px' }}>
//             <Form.Item<IProfileForm>
//               label={t('const.email')}
//               name="email"
//               rules={[
//                 {
//                   required: true,
//                 },
//                 {
//                   type: 'email',
//                   message: t('components.message.email_warning_text'),
//                 },
//               ]}
//             >
//               <Input placeholder={t('const.email')} />
//             </Form.Item>

//             <Form.Item
//               label={t('const.phone_number')}
//               name="phoneNumber"
//               rules={[
//                 {
//                   required: true,
//                 },
//                 {
//                   pattern: /^\+998 \d{2} \d{3}-\d{2}-\d{2}$/,
//                   message: t('components.message.phone_warning_text'),
//                 },
//               ]}
//             >
//               <FormattedPhoneNumberInput />
//             </Form.Item>
//           </Flex>
//         </Card>

//         <Card>
//           <Flex justify="space-between">
//             <Typography.Title level={4}>
//               {t('dashboard.settings.profile.edit_password')}
//             </Typography.Title>
//             <Switch onChange={handlePasswordSwitchChange} />
//           </Flex>

//           <Flex vertical gap={16} flex={1} style={{ minWidth: '150px' }}>
//             <Form.Item<IProfileForm>
//               label={t('const.password')}
//               name="password"
//               rules={[
//                 {
//                   required: isPasswordEnabled,
//                   message: `${t('const.please')}, ${t('components.message.enter_password_text')}!`,
//                 },
//                 {
//                   pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//                   message: t('components.message.password_warning_text'),
//                 },
//               ]}
//             >
//               <Input.Password
//                 placeholder={t('const.password')}
//                 disabled={!isPasswordEnabled}
//                 autoComplete="new-password"
//               />
//             </Form.Item>

//             <Form.Item<IProfileForm>
//               label={toFirstCapitalLetter(
//                 t('components.message.confirm_password_text')
//               )}
//               name="repeatedPassword"
//               dependencies={['password']}
//               rules={[
//                 {
//                   required: isPasswordEnabled,
//                   message: `${t('const.please')}, ${t('components.message.confirm_password_text')}!`,
//                 },
//                 ({ getFieldValue }) => ({
//                   validator(_, value) {
//                     if (
//                       !isPasswordEnabled ||
//                       getFieldValue('password') === value
//                     ) {
//                       return Promise.resolve();
//                     }
//                     return Promise.reject(
//                       new Error(
//                         t('components.message.no_matching_password_text')
//                       )
//                     );
//                   },
//                 }),
//               ]}
//             >
//               <Input.Password
//                 placeholder="Parol"
//                 disabled={!isPasswordEnabled}
//                 autoComplete="off"
//               />
//             </Form.Item>
//           </Flex>
//         </Card>
//       </Flex>
//     </Form>
//   );
// };

// export default ProfileForm;
