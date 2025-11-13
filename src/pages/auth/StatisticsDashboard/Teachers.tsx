import {
  Bar,
  BarConfig,
  Column,
  ColumnConfig,
  Pie,
  PieConfig,
} from '@ant-design/charts';
import { Skeleton } from 'antd';
import React, { useContext } from 'react';
import { IStatisticsContext, StatisticsContext } from '.';

const Teachers: React.FC = () => {
  const teachers = (useContext(StatisticsContext) as IStatisticsContext)
    ?.teachersInfo;

  const GiveRegionStat = (
    name = 'academic_degree',
    series = ['Erkak', 'Ayol'],
    chart = 'default'
  ) => {
    let a: any[] = [];
    if (chart == 'default') {
      series.forEach(type => {
        for (let nomi in teachers?.[name]) {
          a.push({
            name: type,
            darajasi: nomi,
            soni: teachers?.[name]?.[nomi]?.[type],
          });
        }
      });
    } else {
      for (let nomi in teachers?.[name]) {
        a.push({
          type: nomi,
          value: teachers?.[name]?.[nomi],
        });
      }
    }
    return a;
  };

  const configPie: PieConfig = {
    radius: 0.9,
    height: 360,
    data: GiveRegionStat('position', [], 'pie'),
    innerRadius: 0.8,
    appendPadding: 10,
    colorField: 'type',
    angleField: 'value',
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 0,
      },
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: 'white',
        },
        content: `${GiveRegionStat('position', [], 'pie').reduce(
          (a, b) => a + b?.value,
          0
        )} ta`,
      },
    },
    color: ['#DA8FFF', '#30DB5B', '#FF6482', '#70D7FF', '#FFD426', '#7D7AFF'],
    legend: {
      itemName: {
        style: {
          fill: 'white',
        },
      },
    },
  };
  const configRahbarPie: PieConfig = {
    radius: 0.9,
    height: 360,
    data: GiveRegionStat('direction', [], 'pie'),
    innerRadius: 0.6,
    appendPadding: 10,
    colorField: 'type',
    angleField: 'value',
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 0,
      },
    },
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          color: 'white',
        },
        content: `${GiveRegionStat('direction', [], 'pie').reduce(
          (a, b) => a + b?.value,
          0
        )}  ta`,
      },
    },
    color: ['#FF6482', '#FFD426', '#DA8FFF'],
    legend: {
      itemHeight: 12,
      position: 'bottom',
      itemName: {
        style: {
          fill: 'white',
        },
      },
    },
  };
  const configIlmiyPie: PieConfig = {
    height: 360,
    data: GiveRegionStat('academic', [], 'pie'),
    appendPadding: 10,
    colorField: 'type',
    angleField: 'value',
    color: ['#30DB5B', '#FF6482', '#FFD426'],
    legend: {
      itemHeight: 12,
      position: 'bottom',
      itemName: {
        style: {
          fill: 'white',
        },
      },
    },
    label: {
      style: {
        opacity: 1,
        fill: 'white',
        fontSize: 14,
      },
    },
  };

  const configColumn: ColumnConfig = {
    data: GiveRegionStat(),
    isGroup: true,
    yField: 'soni',
    xField: 'darajasi',
    seriesField: 'name',
    color: ['#DA8FFF', '#70D7FF'],
    legend: {
      position: 'bottom',
      itemHeight: 12,
      itemName: {
        style: {
          fill: 'white',
        },
      },
    },
    columnStyle: {
      style: {
        borderRadius: 10,
      },
      radius: [6, 6, 6, 6],
      fillOpacity: 1,
    },
    yAxis: {
      label: {
        style: {
          opacity: 1,
          fill: 'white',
          fontSize: 14,
        },
      },
    },
    xAxis: {
      tickCount: 6,
      label: {
        style: {
          opacity: 1,
          fill: 'white',
          fontSize: 14,
        },
      },
    },
  };

  const configBar: BarConfig = {
    data: GiveRegionStat('academic_rank'),
    isStack: true,
    yField: 'darajasi',
    xField: 'soni',
    seriesField: 'name',
    color: ['#DA8FFF', '#70D7FF'],
    legend: {
      itemHeight: 12,
      position: 'bottom',
      itemName: {
        style: {
          fill: 'white',
        },
      },
    },
    barStyle: {
      radius: [6, 6, 6, 6],
      fillOpacity: 1,
    },
    yAxis: {
      label: {
        style: {
          opacity: 1,
          fill: 'white',
          fontSize: 14,
        },
      },
    },
    xAxis: {
      tickCount: 6,
      label: {
        style: {
          opacity: 1,
          fill: 'white',
          fontSize: 14,
        },
      },
    },
  };
  const configAgeBar: BarConfig = {
    data: GiveRegionStat('age'),
    isStack: true,
    yField: 'darajasi',
    xField: 'soni',
    seriesField: 'name',
    color: ['#DA8FFF', '#70D7FF'],
    legend: {
      itemHeight: 12,
      position: 'bottom',
      itemName: {
        style: {
          fill: 'white',
        },
      },
    },
    barStyle: {
      radius: [6, 6, 6, 6],
      fillOpacity: 1,
    },
    yAxis: {
      label: {
        style: {
          opacity: 1,
          fill: 'white',
          fontSize: 14,
        },
      },
    },
    xAxis: {
      tickCount: 6,
      label: {
        style: {
          opacity: 1,
          fill: 'white',
          fontSize: 14,
        },
      },
    },
  };

  const configFormBar: BarConfig = {
    data: GiveRegionStat('employment_form', [], 'pie'),
    yField: 'type',
    xField: 'value',
    seriesField: 'type',
    color: ['#7D7AFF', '#30DB5B'],
    legend: {
      itemHeight: 12,
      position: 'bottom',
      itemName: {
        style: {
          fill: 'white',
        },
      },
      flipPage: false,
    },
    barStyle: {
      radius: [6, 6, 6, 6],
      fillOpacity: 1,
    },
    yAxis: {
      label: {
        style: {
          opacity: 1,
          fill: 'white',
          fontSize: 14,
        },
      },
    },
    xAxis: {
      tickCount: 6,
      label: {
        style: {
          opacity: 1,
          fill: 'white',
          fontSize: 14,
        },
      },
    },
  };

  if (!teachers) return <Skeleton active />;

  return (
    <div className="home__teachers">
      <section className="home__teachers-pie">
        <div>
          <h2 className="title">O‘qituvchilar lavozimi bo‘yicha</h2>
          <Pie {...configPie} />
        </div>
        <div>
          <h2 className="title">O‘qituvchilar (Jins bo‘yicha)</h2>
          <div data-aos="fade-left" className="statbox blue">
            <h3>Erkaklar</h3>
            <span>{teachers?.gender?.Erkak} ta</span>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="100"
            className="statbox pink"
          >
            <h3>Ayollar</h3>
            <span>{teachers?.gender?.Ayol} ta</span>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="200"
            className="statbox green"
          >
            <h3>Jami o‘qituvchilar soni</h3>
            <span>{teachers?.gender?.Jami} ta</span>
          </div>
        </div>
        <div>
          <h2 className="title">O‘qituvchilar (Fuqarolik bo‘yicha)</h2>
          <div
            data-aos="fade-left"
            data-aos-delay="300"
            className="statbox purple"
          >
            <h3>O‘zbekiston Respublikasi fuqarosi</h3>
            <span>
              {teachers?.citizenship?.['O‘zbekiston Respublikasi fuqarosi']} ta
            </span>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="400"
            className="statbox mango"
          >
            <h3>Xorijiy davlat fuqarosi </h3>
            <span>{teachers?.citizenship?.['Xorijiy davlat fuqarosi']} ta</span>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="500"
            className="statbox yellow"
          >
            <h3>Fuqaroligi yo‘q shaxslar</h3>
            <span>
              {teachers?.citizenship?.['Fuqaroligi yo‘q shaxslar']} ta
            </span>
          </div>
        </div>
      </section>

      <div className="row">
        <section
          data-aos="fade-right"
          data-aos-duration="1500"
          className="home__teachers-bar"
        >
          <div className="flex">
            <h2 className="title">O‘qituvchilar ilmiy daraja bo‘yicha</h2>
          </div>
          <Column {...configColumn} />
        </section>
        <section
          data-aos="fade-left"
          data-aos-duration="1500"
          className="home__teachers-bar"
        >
          <div className="flex">
            <h2 className="title">O‘qituvchilar ilmiy unvon bo‘yicha</h2>
            <h3>
              Jami:{' '}
              <b>
                {GiveRegionStat('academic_rank').reduce(
                  (a, b) => a + b?.soni,
                  0
                )}{' '}
                ta
              </b>
            </h3>
          </div>
          <Bar {...configBar} />
        </section>
      </div>

      <div className="row">
        <section
          data-aos="fade-right"
          data-aos-duration="1500"
          className="home__teachers-bar"
        >
          <div className="flex">
            <h2 className="title">Rahbar xodimlar</h2>
          </div>
          <Pie {...configRahbarPie} />
        </section>
        <section
          data-aos="fade-left"
          data-aos-duration="1500"
          className="home__teachers-bar"
        >
          <div className="flex">
            <h2 className="title">O‘qituvchilar ilmiy salohiyati bo‘yicha</h2>
            <h3>
              Jami:{' '}
              <b>
                {GiveRegionStat('academic', [], 'pie').reduce(
                  (a, b) => a + b?.value,
                  0
                )}{' '}
                ta
              </b>
            </h3>
          </div>
          <Pie {...configIlmiyPie} />
        </section>
      </div>

      <div className="row">
        <section
          data-aos="fade-right"
          data-aos-duration="1500"
          className="home__teachers-bar"
        >
          <div className="flex">
            <h2 className="title">O‘qituvchilar yoshi bo‘yicha</h2>
            {/* <h3>
              Jami: <b>6000 ta</b>
            </h3> */}
          </div>
          <Bar {...configAgeBar} />
        </section>
        <section
          data-aos="fade-left"
          data-aos-duration="1500"
          className="home__teachers-bar"
        >
          <div className="flex">
            <h2 className="title">O‘qituvchilar mehnat shakli bo‘yicha</h2>
            {/* <h3>
              Jami: <b>6000 ta</b>
            </h3> */}
          </div>
          {/* <Funnel {...configFunnel} /> */}
          <Bar {...configFormBar} />
        </section>
      </div>
    </div>
  );
};

export default Teachers;
