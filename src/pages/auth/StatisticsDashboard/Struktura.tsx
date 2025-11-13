import {
  Bar,
  BarConfig,
  Column,
  ColumnConfig,
  Pie,
  PieConfig,
} from '@ant-design/charts';
import { Segmented, Skeleton } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import { IStatisticsContext, StatisticsContext } from '.';

const Struktura: React.FC = () => {
  const structures = (useContext(StatisticsContext) as IStatisticsContext)
    ?.structuresInfo;
  const [audi, setAudi] = useState<any[]>([]);
  const [bolim, setbolim] = useState<any[]>([]);
  const [guruh, setguruh] = useState<any[]>([]);
  const [yonalish, setyonalish] = useState<any[]>([]);
  const [guruhType, setGuruhType] = useState<'Bakalavr' | 'Magistr'>(
    'Bakalavr'
  );

  const configPie: PieConfig = {
    height: 360,
    data: yonalish,
    appendPadding: 10,
    colorField: 'name',
    angleField: 'count',
    color: ['#7D7AFF', '#30DB5B', '#FF6482', '#FFD426'],
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
  const configBar: BarConfig = {
    data: bolim,
    yField: 'name',
    xField: 'count',
    seriesField: 'name',
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
  const configColumn: ColumnConfig = {
    data: guruh,
    yField: 'count',
    xField: 'name',
    seriesField: 'name',
    color: ['#7D7AFF', '#30DB5B'],
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
  const apexConfig = {
    series: [
      {
        data: audi,
      },
    ],
    options: {
      chart: {
        id: 'treemap',
        toolbar: {
          show: false,
        },
      },
    },
  };

  useEffect(() => {
    let final = [];
    for (let nomi in structures?.groups?.[guruhType]) {
      final.push({
        name: nomi,
        count: structures?.groups?.[guruhType]?.[nomi],
      });
    }
    setguruh(final);
  }, [structures, guruhType]);

  useEffect(() => {
    (async () => {
      setAudi(
        structures?.auditoriums?.reduce(
          (a: any, b: any) => [{ x: b?.name, y: b?.count }, ...a],
          []
        )
      );
      setbolim(structures?.departments);
      setyonalish(structures?.specialities);
    })();
  }, [structures]);

  if (!structures) return <Skeleton active />;

  return (
    <div className="home__teachers">
      <div className="row">
        <section
          data-aos="zoom-in"
          data-aos-duration="1500"
          className="home__teachers-bar"
        >
          <div className="flex" style={{ alignItems: 'flex-start' }}>
            <h2 className="title">Guruhlar</h2>
            <Segmented
              defaultValue="Bakalavr"
              onChange={(val: any) => setGuruhType(val)}
              style={{ background: '#4B5364' }}
              options={['Bakalavr', 'Magistr']}
            />
          </div>
          <Column {...configColumn} />
        </section>
        <section
          data-aos="zoom-in"
          data-aos-duration="1500"
          className="home__teachers-bar"
        >
          <div className="flex">
            <h2 className="title">Auditoriyalar soni</h2>
            <h3>
              Jami: <b>{audi.reduce((a, b) => a + b?.y, 0)} ta</b>
            </h3>
          </div>

          <Chart
            series={apexConfig.series}
            options={apexConfig.options}
            type="treemap"
            height={360}
          />
        </section>
      </div>
      <div className="row">
        <section
          data-aos="zoom-in"
          data-aos-duration="1500"
          className="home__teachers-bar"
        >
          <div className="flex">
            <h2 className="title">Yo‘nalishlar</h2>
            <h3>
              Jami: <b>{yonalish.reduce((a, b) => a + b?.count, 0)} ta</b>
            </h3>
          </div>

          <Pie {...configPie} />
        </section>
        <section
          data-aos="zoom-in"
          data-aos-duration="1500"
          className="home__teachers-bar"
        >
          <div className="flex">
            <h2 className="title">Bo‘limlar</h2>
            <h3>
              Jami: <b>{bolim.reduce((a, b) => a + b?.count, 0)} ta</b>
            </h3>
          </div>

          <Bar {...configBar} />
        </section>
      </div>
    </div>
  );
};

export default Struktura;
