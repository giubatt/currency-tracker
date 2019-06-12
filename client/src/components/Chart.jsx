import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import ChartJS from 'chart.js';

import { Row, Col, Statistic, Card, Icon, Spin } from 'antd';

function VariationStats({ value, title }) {
  return (
    <Card>
      <Statistic
        title={title}
        value={value}
        precision={2}
        valueStyle={{
          color: value > 0 ? '#3f8600' : '#cf1322'
        }}
        prefix={
          value > 0 ? <Icon type="arrow-up" /> : <Icon type="arrow-down" />
        }
        suffix="%"
      />
    </Card>
  );
}

function Chart() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});
  const [variations, setVariations] = useState({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const sevenDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      let { data } = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/finance/BTC,USD,EUR?startDate=${sevenDaysAgo.toISOString()}`
      );
      setData(data);

      ({ data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/finance/variation/BTC,USD,EUR`
      ));
      setVariations(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (loading) return;
    const config = {
      type: `scatter`,
      options: {
        hover: {
          mode: 'index',
          intersect: false
        },
        tooltips: {
          mode: 'index',
          intersect: false
        },
        animation: {
          duration: 0
        },
        legend: {
          position: `bottom`
        },
        scales: {
          xAxes: [
            {
              type: 'time',
              time: {
                unit: 'day'
              }
            }
          ],
          yAxes: [
            {
              scaleLabel: {
                display: true,
                labelString: `Valor (R$)`
              }
            }
          ]
        }
      }
    };
    new ChartJS('graph-btc', {
      ...config,
      data: {
        datasets: [
          {
            label: `BTC`,
            backgroundColor: `#f7931a40`,
            borderColor: `#f7931a`,
            data: data.BTC
              ? data.BTC.map(({ date, bid }) => {
                  return {
                    x: new Date(date),
                    y: bid
                  };
                })
              : [],
            fill: false,
            showLine: true,
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      }
    });

    new ChartJS('graph-usd', {
      ...config,
      data: {
        datasets: [
          {
            label: `USD`,
            backgroundColor: `#6CA30A40`,
            borderColor: `#6CA30A`,
            data: data.USD
              ? data.USD.map(({ date, bid }) => {
                  return {
                    x: new Date(date),
                    y: bid
                  };
                })
              : [],
            fill: false,
            showLine: true,
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      }
    });

    new ChartJS('graph-eur', {
      ...config,
      data: {
        datasets: [
          {
            label: `EUR`,
            backgroundColor: `#08626B40`,
            borderColor: `#08626B`,
            data: data.EUR
              ? data.EUR.map(({ date, bid }) => {
                  return {
                    x: new Date(date),
                    y: bid
                  };
                })
              : [],
            fill: false,
            showLine: true,
            pointRadius: 0,
            borderWidth: 2
          }
        ]
      }
    });
  }, [data.BTC, data.EUR, data.USD, loading]);

  const renderVariations = values => (
    <>
      <Row gutter={8}>
        <Col span={12}>
          <VariationStats title="Dia" value={values ? values.day : 0} />
        </Col>
        <Col span={12}>
          <VariationStats title="Semana" value={values ? values.week : 0} />
        </Col>
      </Row>
      <Row gutter={8} style={{ marginTop: 8 }}>
        <Col span={12}>
          <VariationStats title="Mês" value={values ? values.month : 0} />
        </Col>
        <Col span={12}>
          <VariationStats
            title="3 Meses"
            value={values ? values.trimester : 0}
          />
        </Col>
      </Row>
    </>
  );

  if (loading)
    return (
      <div
        style={{
          display: 'grid',
          justifyContent: 'center'
        }}
      >
        <Spin
          indicator={<Icon type="loading" style={{ fontSize: 72 }} spin />}
        />
      </div>
    );

  return (
    <>
      <Row gutter={32}>
        <Col span={8}>
          <Card title="Bitcoin (BTC)">
            <div style={{ height: 300 }}>
              <canvas
                style={{ height: `100%`, width: `100%` }}
                id="graph-btc"
              />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Dólar (USD)">
            <div style={{ height: 300 }}>
              <canvas
                style={{ height: `100%`, width: `100%` }}
                id="graph-usd"
              />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Euro (EUR)">
            <div style={{ height: 300 }}>
              <canvas
                style={{ height: `100%`, width: `100%` }}
                id="graph-eur"
              />
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={32} style={{ marginTop: 16 }}>
        <Col span={8}>{renderVariations(variations.BTC)}</Col>
        <Col span={8}>{renderVariations(variations.USD)}</Col>
        <Col span={8}>{renderVariations(variations.EUR)}</Col>
      </Row>
    </>
  );
}

export default Chart;
