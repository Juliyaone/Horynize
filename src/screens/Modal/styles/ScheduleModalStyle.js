import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    width: '100%',
    minHeight: '50%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    justifyContent: 'flex-start',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 28,
    letterSpacing: 0.35,
    color: '#212121',
    marginBottom: 24,
  },
  boxBtnSchedule: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  btnTimeSchedule: {
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    borderRadius: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  textBtnSchedule: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 17,
    lineHeight: 20,
    letterSpacing: 0.374,
    color: '#212121',
  },
  boxBtnLabelSchedule: {
    width: '100%',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
  },
  labelSchedule: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#787880',
    marginBottom: 7,
  },
  boxDaysContainers: {
    width: '100%',
    marginBottom: 10,
  },
  boxDays: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  boxDaysHeader: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#787880',
    marginBottom: 15,
  },

  dayTextInactive: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#787880',
  },
  dayTextActive: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    textTransform: 'uppercase',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#FFFFFF',
  },
  dayButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 40,
    minHeight: 40,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: '#ED7635',
  },
  boxAutoRunContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  boxAutoRun: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 25,
  },
  autoRunHeader: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#787880',
  },
  autoRunHeaderValue: {
    fontFamily: 'SFProDisplay',
    fontStyle: 'normal',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 17,
    letterSpacing: 0.374,
    color: '#ED7635',
  },
  button: {
    width: '100%',
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 0,
    marginBottom: 10,
  },
  gradientBackground: {
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sliderBox: {
    flexDirection: 'column',
  },
});
