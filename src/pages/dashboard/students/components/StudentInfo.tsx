import { Tabs } from "antd"
import StudentDetails from "./StudentDetails"
import StudentPassport from "./StudentPassport"

const StudentInfo = (props) => {
    return (
        <Tabs
            defaultActiveKey="passport"
            items={[
                { key: 'passport', label: "Talaba pasporti", children: <StudentPassport {...props} /> },
                { key: 'details', label: "Talaba ma'lumoti", children: <StudentDetails {...props} /> },
            ]}
        />
    )
}

export default StudentInfo