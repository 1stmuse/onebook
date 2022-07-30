import { View, Text, useWindowDimensions, StyleSheet } from 'react-native'
import React from 'react'
import VerticalBarGraph from '@chartiful/react-native-vertical-bar-graph';
import colors from '../../utility/colors';
import Header from '../../components/Header';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

interface Props {}

const Chart = (props: Props) => {
  const { books } = useSelector((state:RootState) => state.books)
  const { width } = useWindowDimensions()
  const booksPrices = books.map((bk) => bk.customAmount?.toString())

  const config = {
    hasXAxisBackgroundLines: false,
    xAxisLabelStyle: {
      position: 'right',
    }
  };
  

  return (
    <View>
      <Header title='Chart Statistics' />
      <View style={styles.chartView} >
      <VerticalBarGraph
      data={[5, 3, 9, 4, 2]}
      labels={booksPrices}
      width={375}
      height={350}
      barRadius={15}
      baseConfig={config}
      barColor={colors.blue}
      style={styles.chart}
    />
{/* <BarChart
  style={{width: "100%", backgroundColor: colors.blue}}
  data={data}
  width={width}
  height={220}
  yAxisLabel="$"
  chartConfig={chartConfig}
  verticalLabelRotation={0}
/> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  chartView: {
    marginTop: 30
  },
  chart: {
    marginBottom: 30,
    padding: 10,
    paddingTop: 20,
    borderRadius: 20,
    width: 375,
    backgroundColor: colors.white
  }
})

export default Chart