import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import ChartJS from 'chart.js';

import Spinner from 'react-bootstrap/Spinner';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Chart() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({});

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const sevenDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const { data } = await axios.get(
        `${
          process.env.REACT_APP_API_URL
        }/finance/BTC,USD,EUR?startDate=${sevenDaysAgo.toISOString()}`
      );
      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    new ChartJS('graph', {
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
      },
      data: {
        datasets: [
          {
            label: `BTC`,
            backgroundColor: `#AF130B40`,
            borderColor: `#AF130B`,
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
          },
          {
            label: `USD`,
            backgroundColor: `#08626B40`,
            borderColor: `#08626B`,
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
          },
          {
            label: `EUR`,
            backgroundColor: `#6CA30A40`,
            borderColor: `#6CA30A`,
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
  }, [data.BTC, data.EUR, data.USD]);

  return (
    <Container>
      <Row>
        <Col md={8}>
          <canvas style={{ height: `100%`, width: `100%` }} id="graph" />
        </Col>
        <Col md={4} />
      </Row>
    </Container>
  );
}

export default Chart;
