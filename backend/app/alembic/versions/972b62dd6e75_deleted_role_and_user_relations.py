"""deleted role and user relations

Revision ID: 972b62dd6e75
Revises: 2485dd2856f1
Create Date: 2023-11-22 21:46:14.325398

"""
from typing import Sequence, Union

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision: str = '972b62dd6e75'
down_revision: Union[str, None] = '2485dd2856f1'
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None


def upgrade() -> None:
    pass


def downgrade() -> None:
    pass
