# agent-performance-pipeline - Agent performance analytics
# Framework: airflow
import logging
from datetime import datetime

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class AgentPerformancePipeline:
    '''Agent performance analytics'''
    def __init__(self):
        self.name = 'agent-performance-pipeline'
        self.version = '1.0.0'

    def run(self):
        logger.info('Starting ' + self.name)
        self.extract()
        self.transform()
        self.load()
        logger.info(self.name + ' completed')

    def extract(self):
        logger.info('Extracting data...')

    def transform(self):
        logger.info('Transforming data...')

    def load(self):
        logger.info('Loading data...')


if __name__ == '__main__':
    pipeline = AgentPerformancePipeline()
    pipeline.run()
