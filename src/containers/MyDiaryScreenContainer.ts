import { connect } from 'react-redux';
import MyDiaryScreen from '../screens/MyDiaryScreen';
import { deleteDiary } from '../stores/actions/diaryList';

const mapDispatchToProps = {
  deleteDiary,
};

export default connect(null, mapDispatchToProps)(MyDiaryScreen);
