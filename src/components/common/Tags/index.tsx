import { Tag } from '@leanspace/js-client/dist/types/Generic';
import { Tag as AntTag } from 'antd';

interface TagsProps {
  tags: Tag[];
}
const Tags: React.FC<React.PropsWithChildren<TagsProps>> = ({ tags }) => {
  const tagList = tags.map(({ key, value }) => (
    <AntTag key={`${key}-${value}`}>
      {key}
      {value ? `=${value}` : ''}
    </AntTag>
  ));
  return <>{tagList}</>;
};

export default Tags;
