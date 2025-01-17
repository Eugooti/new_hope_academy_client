import Heading from "../../../components/heading/Heading.jsx";
import {getFromSessionStorage} from "../../../utils/LocalStorage/sessionStorage.jsx";
import {useTheme} from "../../../context/ThemeContext/ThemeContext2.jsx";
import {Descriptions, Table} from "antd";
import {transformOutcome} from "../../../Tests.js";
import {createStyles} from "antd-style";
import {useState} from "react";
import {CreateAssessmentReport} from "../../../utils/PDFDownload/CreateAssessmentReport.js";

const useStyle = createStyles(({ css, token }) => {
    const { antCls } = token;
    return {
        customTable: css`
            ${antCls}-table {
                ${antCls}-table-container {
                    ${antCls}-table-body,
                    ${antCls}-table-content {
                        scrollbar-width: thin;
                        scrollbar-color: unset;
                    }
                }
            }
        `,
    };
});

const AssessmentReport = () => {
    const {currentTheme} = useTheme()

    const reports= getFromSessionStorage('assessmentReport');
    const subjectColumns = reports?.subjects.map((subjectData) => ({
        title: subjectData,
        dataIndex: subjectData,
    }));

    const calculateTotal = (record) => {
        let sum =0
        subjectColumns.forEach(item => {
            sum+=record[item.title]
        })
        return sum;
    }
    const [data] = useState(transformOutcome(reports.learners).map((item,index)=>({
        key: index.toString(),
        ...item,
        marks:calculateTotal(item)
    })));

    const columns = [
        {
            title: 'Full Name',
            dataIndex: 'name',
            fixed: 'left',
        },
        {
            title: 'Admission Number',
            dataIndex: 'admNo',
            fixed: 'left',
        },
        ...subjectColumns,
        {
            title: 'Marks',
            dataIndex: 'marks',
            fixed: 'right',
            width:'120px',
        }

    ]



    const { styles } = useStyle();

    return (
      <>

          <Heading title={reports?.name} subtitle={"Assessment Report"} />
          <div>
              <button
                  onClick={()=>CreateAssessmentReport(reports,data)}
                  className='h-10 w-24 bg-red-500 rounded-md'>Print Report</button>
          </div>
          <div style={{background:currentTheme.background}} className='shadow-md p-4 mt-8 rounded-2xl'>

              <Descriptions
                  title="Exam Details."
                  column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1}}
                  style={{color:currentTheme.text}}
              >
                  <Descriptions.Item style={{color:currentTheme.text}} label="Classroom">{reports?.classroom}</Descriptions.Item>
                  <Descriptions.Item style={{color:currentTheme.text}} label="Facilitator">{reports?.facilitator}</Descriptions.Item>
                  <Descriptions.Item style={{color:currentTheme.text}} label="Term">{reports?.term}</Descriptions.Item>
                  <Descriptions.Item style={{color:currentTheme.text}} label="Tests">{reports?.tests}</Descriptions.Item>
                  <Descriptions.Item style={{color:currentTheme.text}} label="Examiners">{reports?.examiners}</Descriptions.Item>
                  <Descriptions.Item style={{color:currentTheme.text}} label="Date">{reports?.date}</Descriptions.Item>

              </Descriptions>

          </div>
          <div className='pt-3 grid grid-cols-1 gap-3'>
              <label className='text-2xl'>
                  Learner Scores
              </label>
              <Table
                  bordered
                  className={styles.customTable}
                  scroll={{ x: 'max-content'}}
                  columns={columns}
                  dataSource={data.map((item, index) => ({ ...item, key: index.toString() }))}
              />
          </div>


      </>
  )
}
export default AssessmentReport