import { useMemo } from 'react';
import { ResourceTypes } from './Library';
import ResourcesJournal from './components/ResourcesJournal';
import ResourcesWithMedia from './components/ResourcesWithMedia';
import resourceBuilder from './resourceBuilder';

const ResourceReducer = ({ resourceType }: { resourceType: ResourceTypes }) => {
  const ResourceComponent = useMemo(
    () => resourceBuilder({ resourceType }),
    [resourceType]
  );

  switch (resourceType) {
    case 'all':
    case 'literature':
    case 'articles':
    case 'dissertations':
    case 'monographs':
      return (
        <ResourcesWithMedia>
          <ResourceComponent />
        </ResourcesWithMedia>
      );
    case 'journals':
      return (
        <ResourcesJournal>
          <ResourceComponent />
        </ResourcesJournal>
      );
  }
  return null;
};

export default ResourceReducer;
